# 🎵 Ajouter une musique de fond au site

## Étape 1: Préparer votre fichier MP3

1. Choisissez votre musique de mariage (MP3)
2. Renommez-le: `wedding-song.mp3`
3. Copiez-le dans le dossier: `wedding-website/music/`

**Commande:**
```bash
cp /chemin/vers/votre/musique.mp3 ~/wedding-website/music/wedding-song.mp3
```

## Étape 2: Activer la musique dans le site

La musique est déjà configurée dans `index.html` (lignes 13-21) mais désactivée par défaut.

**Pour l'activer:**

### Option A: Activer le lecteur audio (avec bouton)

Dans `index.html`, changez la ligne 14:
```html
<!-- AVANT (désactivé) -->
<div class="audio-controls" style="display: none;">

<!-- APRÈS (activé) -->
<div class="audio-controls">
```

Et décommentez la ligne 20:
```html
<!-- AVANT -->
<!-- <source src="music/wedding-song.mp3" type="audio/mpeg"> -->

<!-- APRÈS -->
<source src="music/wedding-song.mp3" type="audio/mpeg">
```

### Option B: Musique automatique (sans bouton)

Dans `index.html`, ajoutez `autoplay` à la balise audio (ligne 18):
```html
<audio id="bgMusic" loop autoplay>
    <source src="music/wedding-song.mp3" type="audio/mpeg">
</audio>
```

**⚠️ Note:** Les navigateurs modernes bloquent l'autoplay. La musique ne démarrera qu'après un clic de l'utilisateur.

## Étape 3: Contrôle du volume

Pour ajuster le volume par défaut, ajoutez dans `script.js`:

```javascript
const bgMusic = document.getElementById('bgMusic');
if (bgMusic) {
    bgMusic.volume = 0.3; // 30% du volume (0.0 à 1.0)
}
```

## Étape 4: Déployer

Une fois votre MP3 ajouté:
```bash
cd ~/wedding-website
git add music/wedding-song.mp3
git add index.html  # si modifié
git commit -m "Ajout musique de mariage"
git push origin main
```

## 🎼 Recommandations

**Format:**
- MP3 (meilleure compatibilité)
- Bitrate: 128-192 kbps (bon compromis qualité/taille)
- Taille: < 5 MB idéalement

**Durée:**
- Minimum 2-3 minutes pour éviter les boucles trop courtes
- Optimiser pour le web (ne pas mettre une chanson de 10 MB)

**Volume:**
- Commencer bas (30-40%) pour ne pas surprendre les visiteurs
- Laisser le contrôle à l'utilisateur (bouton pause)

## 📁 Structure finale

```
wedding-website/
├── music/
│   └── wedding-song.mp3  ← Votre fichier ici
├── photos/
├── index.html
├── styles.css
└── script.js
```

## 🔧 Personnalisation avancée

### Changer l'icône du bouton audio

Dans `index.html` ligne 15:
```html
<button id="audioToggle" class="audio-btn" aria-label="Contrôle musique">🎵</button>
```

Changez 🎵 par: 🎶 🎸 🎹 🎺 🎻 ou autre emoji

### Style du bouton

Le CSS est dans `styles.css` lignes 21-47.

## ✅ Pour tester

1. Ajoutez votre MP3 dans `music/`
2. Ouvrez `index.html` localement
3. Cliquez sur le bouton 🎵 en haut à droite
4. La musique devrait jouer!

## 🆘 Problèmes?

**La musique ne joue pas:**
- Vérifiez que le fichier est bien `music/wedding-song.mp3`
- Vérifiez la console du navigateur (F12)
- Essayez un autre fichier MP3

**Le bouton n'apparaît pas:**
- Vérifiez que `style="display: none;"` est retiré de `audio-controls`

**Erreur 404:**
- Le fichier MP3 n'est pas au bon endroit
- Vérifiez le chemin: `music/wedding-song.mp3`
