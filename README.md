# 💕 Site Web de Mariage / Wedding Website

Un site web élégant et animé pour célébrer votre mariage, avec des animations scroll reveal et un design bilingue français-vietnamien.

## ✨ Fonctionnalités

- 🎨 Design élégant avec dégradés de couleurs romantiques
- 💫 Animations scroll reveal fluides
- 💕 Cœurs animés flottants
- 🖼️ Galerie photo avec lightbox
- 📱 Design responsive (mobile, tablette, desktop)
- 🌍 Bilingue : Français / Vietnamien
- ⚡ Performance optimisée
- ♿ Accessible (textes alternatifs, contraste des couleurs)

## 📂 Structure du Projet

```
wedding-website/
├── index.html          # Page principale
├── styles.css          # Styles et animations
├── script.js           # Interactions JavaScript
├── photos/             # Dossier des photos de mariage
│   ├── photo1.jpg
│   ├── photo2.jpg
│   └── ...
├── analyze.js          # Script Puppeteer pour analyser le site
└── README.md           # Ce fichier
```

## 🚀 Utilisation

### Ouverture Simple

1. Ouvrez le fichier `index.html` dans votre navigateur
2. Le site se charge immédiatement !

### Avec un Serveur Local (Recommandé)

Pour éviter les problèmes de CORS avec certains navigateurs :

```bash
# Avec Python 3
python3 -m http.server 8000

# Ou avec Node.js (si vous avez http-server installé)
npx http-server

# Puis ouvrez http://localhost:8000 dans votre navigateur
```

## 🎵 Ajouter de la Musique

1. Créez un dossier `music/` dans le répertoire du site
2. Ajoutez votre fichier audio (ex: `wedding-song.mp3`)
3. Dans `index.html`, décommentez et modifiez la ligne :
   ```html
   <source src="music/wedding-song.mp3" type="audio/mpeg">
   ```
4. Retirez `style="display: none;"` de la div `.audio-controls`

## 🖼️ Personnaliser les Photos

1. Placez vos photos dans le dossier `photos/`
2. Renommez-les ou modifiez les chemins dans `index.html`
3. Recommandé : optimisez vos photos (max 2-3 MB par photo)

## 🎨 Personnaliser les Couleurs

Dans `styles.css`, modifiez les variables de couleurs :

```css
/* Couleurs principales */
background: linear-gradient(135deg, #ffeef8 0%, #fff5f0 50%, #fffaf5 100%);

/* Couleur des titres */
color: #d4516f;  /* Rose principal */
color: #e89bb5;  /* Rose secondaire */
```

## 🔍 Analyse avec Puppeteer

Pour analyser les performances et détecter les problèmes :

```bash
npm install
node analyze.js
```

Le script créera des captures d'écran et affichera un rapport détaillé.

## 📱 Sections du Site

1. **Hero** - Image principale avec titre bilingue
2. **La Rencontre** - Votre première rencontre
3. **L'Engagement** - Votre engagement
4. **La Cérémonie** - Le jour du mariage
5. **Notre Avenir** - Vos projets ensemble
6. **Galerie** - Collection de photos
7. **Final** - Message d'amour final

## 🛠️ Technologies Utilisées

- HTML5 sémantique
- CSS3 (animations, grid, flexbox)
- JavaScript vanilla (Intersection Observer)
- Google Fonts (Playfair Display, Cormorant Garamond, Noto Sans)
- Puppeteer (pour l'analyse)

## 🌟 Fonctionnalités Avancées

- **Parallax** sur l'image du héro
- **Intersection Observer** pour les animations au scroll
- **Lightbox** pour voir les photos en grand
- **Particules de cœurs** animées en continu
- **Effet sparkle** sur le mouvement de la souris
- **Animations CSS** fluides et performantes

## 📝 Licence

Créé avec amour pour votre mariage 💕

---

**Bon mariage ! / Chúc mừng hạnh phúc ! 🎉**
