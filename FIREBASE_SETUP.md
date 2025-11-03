# 🔥 Configuration Firebase pour le Livre d'Or

## Étape 1: Créer le projet Firebase

1. Allez sur https://console.firebase.google.com/
2. Cliquez sur **"Add project"** (Ajouter un projet)
3. Nom du projet: `wedding-website-phuongmaxime` (ou ce que vous voulez)
4. Cliquez **Continue**
5. Google Analytics: Désactivez (optionnel)
6. Cliquez **Create project**
7. Attendez ~30 secondes

## Étape 2: Configurer Firestore Database

1. Menu gauche → **"Build"** → **"Firestore Database"**
2. Cliquez **"Create database"**
3. **Location**: `europe-west` (proche de vous)
4. **Mode**: **"Start in test mode"** ⚠️ Important pour commencer
5. Cliquez **Enable**

## Étape 3: Obtenir la configuration Web

1. Menu gauche → ⚙️ **Settings** → **Project settings**
2. Scrollez vers **"Your apps"**
3. Cliquez sur **</>** (icône Web)
4. App nickname: `wedding-website`
5. NE PAS cocher "Firebase Hosting"
6. Cliquez **Register app**
7. **COPIEZ** le code de configuration qui ressemble à:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "wedding-website-xxx.firebaseapp.com",
  projectId: "wedding-website-xxx",
  storageBucket: "wedding-website-xxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:xxxxxxxxxxxxx"
};
```

8. Cliquez **Continue to console**

## Étape 4: Configurer les règles de sécurité

1. Dans Firestore Database, allez dans l'onglet **"Rules"**
2. Remplacez le contenu par:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /guestbook/{message} {
      // Tout le monde peut lire les messages publics et anonymes
      allow read: if resource.data.visibility in ['public', 'anonymous'];

      // Tout le monde peut écrire des nouveaux messages
      allow create: if request.auth == null
                    && request.resource.data.name is string
                    && request.resource.data.text is string
                    && request.resource.data.visibility in ['public', 'anonymous', 'private'];

      // Personne ne peut modifier ou supprimer (sauf via console Firebase)
      allow update, delete: if false;
    }
  }
}
```

3. Cliquez **Publish**

## Étape 5: Mettre à jour le code

1. Ouvrez le fichier `firebase-config.js`
2. Remplacez **TOUTE** la configuration par celle copiée à l'étape 3:

```javascript
// Firebase Configuration
const firebaseConfig = {
  apiKey: "VOTRE_API_KEY",
  authDomain: "VOTRE_PROJECT_ID.firebaseapp.com",
  projectId: "VOTRE_PROJECT_ID",
  storageBucket: "VOTRE_PROJECT_ID.appspot.com",
  messagingSenderId: "VOTRE_SENDER_ID",
  appId: "VOTRE_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Export for use in other files
window.db = db;
window.firebase = firebase;
```

## Étape 6: Mettre à jour index.html

Ajoutez ces lignes **AVANT** `<script src="script.js"></script>`:

```html
<!-- Firebase -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>
<script src="firebase-config.js"></script>
<script src="guestbook-firebase.js"></script>
```

**SUPPRIMEZ** ou commentez cette ligne (ancien livre d'or):
```html
<!-- <script> ... class Guestbook { ... } ... </script> -->
```

## Étape 7: Tester

1. Ouvrez `index.html` dans votre navigateur
2. Allez au livre d'or
3. Ajoutez un message de test
4. Vérifiez dans Firebase Console → Firestore Database
5. Vous devriez voir votre message dans la collection `guestbook`

## Étape 8: Page Admin

Pour voir TOUS les messages (y compris privés):

1. Ouvrez `admin.html` dans votre navigateur
2. ⚠️ Cette page montre TOUS les messages, gardez l'URL secrète!
3. URL: `https://max21b07.github.io/wedding-website/admin.html`

## ✅ Fonctionnalités

### Pour les visiteurs:
- ✅ Voir les messages **publics** et **anonymes** de tout le monde
- ✅ Ajouter leurs propres messages
- ✅ 3 modes: Public, Anonyme, Privé
- ✅ Messages en temps réel (mise à jour automatique)

### Pour vous (page admin):
- ✅ Voir **TOUS** les messages (y compris privés)
- ✅ Statistiques en temps réel
- ✅ Filtrer par type de message
- ✅ Supprimer des messages
- ✅ Voir le nom réel même pour les messages anonymes

## 🔒 Sécurité

**IMPORTANT**: La page admin (`admin.html`) n'est pas protégée par mot de passe.

Pour la sécuriser:
1. **Option 1 (simple)**: Ne partagez jamais l'URL `admin.html`
2. **Option 2 (avancée)**: Ajoutez Firebase Authentication plus tard

## 💡 Coût

Firebase Firestore est **GRATUIT** jusqu'à:
- 50,000 lectures / jour
- 20,000 écritures / jour
- 1 GB de stockage

Pour un site de mariage, vous ne dépasserez jamais ces limites!

## 🆘 Problèmes?

Si Firebase ne fonctionne pas:
1. Vérifiez la console du navigateur (F12)
2. Vérifiez que `firebase-config.js` a la bonne configuration
3. Vérifiez que les règles Firestore sont publiées
4. Testez avec admin.html

## 📞 Support

Une fois configuré, dites-moi si tout fonctionne!
