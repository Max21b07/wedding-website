# Configuration GitHub Pages - Étapes à suivre

## 1. Créer le dépôt GitHub

1. Allez sur https://github.com/new
2. Nommez le dépôt: `wedding-website` (ou un autre nom)
3. Choisissez **Public** (nécessaire pour GitHub Pages gratuit)
4. Ne cochez RIEN d'autre (pas de README, pas de .gitignore)
5. Cliquez sur "Create repository"

## 2. Pousser le code

Copiez et collez ces commandes dans votre terminal:

```bash
cd ~/wedding-website
git remote add origin https://github.com/VOTRE_NOM_UTILISATEUR/wedding-website.git
git push -u origin main
```

Remplacez `VOTRE_NOM_UTILISATEUR` par votre nom d'utilisateur GitHub.

## 3. Activer GitHub Pages

1. Allez sur votre dépôt GitHub
2. Cliquez sur **Settings** (en haut à droite)
3. Dans le menu à gauche, cliquez sur **Pages**
4. Sous "Source", sélectionnez:
   - Branch: `main`
   - Folder: `/ (root)`
5. Cliquez sur **Save**

## 4. Accéder à votre site

Après 1-2 minutes, votre site sera disponible à:
`https://VOTRE_NOM_UTILISATEUR.github.io/wedding-website/`

GitHub Pages vous montrera l'URL exacte dans la section Pages.

---

## Alternative: Nom de domaine personnalisé (optionnel)

Si vous avez un nom de domaine:
1. Dans GitHub Pages Settings, ajoutez votre domaine dans "Custom domain"
2. Configurez les DNS de votre domaine:
   - Type A vers: 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153
   - Ou CNAME vers: VOTRE_NOM_UTILISATEUR.github.io

---

## Besoin d'aide?

Dites-moi votre nom d'utilisateur GitHub et je vous donnerai les commandes exactes à copier-coller!
