# 🚀 Portfolio 3D Immersif - Mohamed Ayman Ennajy

Un portfolio web 3D moderne et immersif créé avec Three.js, GSAP, et des technologies web modernes. Conçu pour mettre en valeur les compétences d'un développeur Full Stack avec une expérience utilisateur exceptionnelle.

## ✨ Fonctionnalités Principales

### 🎨 Design & Visuel
- **Scène 3D Interactive** : Arrière-plan 3D avec particules animées et formes géométriques flottantes
- **Animations Fluides** : Transitions et micro-interactions avec GSAP
- **Mode Sombre/Clair** : Basculement fluide entre les thèmes avec sauvegarde des préférences
- **Design Responsive** : Optimisé pour desktop, tablette et mobile
- **Effets Parallaxe** : Mouvements en profondeur lors du scroll

### 🎯 Sections du Portfolio
1. **Hero Section** : Landing page animée avec effet de typing et éditeur de code flottant
2. **À Propos** : Présentation personnelle avec statistiques animées
3. **Formation** : Timeline interactive des diplômes et certifications
4. **Expérience** : Grille de cartes animées pour l'expérience professionnelle
5. **Compétences** : Barres de progression animées pour les technologies (Front-end & Back-end)
6. **Projets** : Galerie de projets avec effets hover et overlays
7. **Contact** : Formulaire de contact stylisé avec animations

### ⚡ Performance & Optimisation
- Lazy loading des images
- Debouncing des événements scroll et resize
- Compression et optimisation des assets
- Code splitting et minification
- Progressive Web App ready

### 🎭 Interactions Avancées
- Effet 3D de tilt sur les cartes au survol
- Navigation smooth scroll
- Scroll spy pour la navigation active
- Animations d'apparition au scroll (AOS)
- Compteurs animés
- Menu mobile responsive

## 🛠️ Technologies Utilisées

### Core Technologies
- **HTML5** : Structure sémantique
- **CSS3** : Styles avancés avec variables CSS et animations
- **JavaScript (ES6+)** : Logique applicative moderne

### Bibliothèques 3D & Animation
- **Three.js (r128)** : Rendu 3D et animations
- **GSAP 3.12** : Animations haute performance
- **Particles.js** : Effets de particules supplémentaires

### Fonts & Icons
- **Google Fonts** : Inter & Fira Code
- **Font Awesome 6.4** : Icônes vectorielles

### Design System
- Variables CSS pour une personnalisation facile
- Palette de couleurs modernes (Indigo/Purple gradient)
- Typographie optimisée pour la lisibilité
- Espacement cohérent avec scale

## 📁 Structure du Projet

```
3d-portfolio/
├── index.html              # Page principale
├── css/
│   └── styles.css         # Styles complets avec thèmes
├── js/
│   ├── three-scene.js     # Configuration Three.js
│   ├── animations.js      # Animations GSAP et interactions
│   └── main.js            # Logique principale de l'application
├── assets/
│   ├── images/            # Images du portfolio
│   └── models/            # Modèles 3D (optionnel)
└── README.md              # Documentation
```

## 🚀 Installation & Déploiement

### Installation Locale

1. **Cloner ou télécharger le projet**
```bash
# Via Git
git clone [votre-repo-url]
cd 3d-portfolio

# Ou simplement télécharger et extraire le dossier
```

2. **Ouvrir avec un serveur local**

Option A - Avec Python :
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Option B - Avec Node.js (http-server) :
```bash
npm install -g http-server
http-server -p 8000
```

Option C - Avec VS Code :
- Installer l'extension "Live Server"
- Clic droit sur index.html → "Open with Live Server"

3. **Accéder au site**
```
http://localhost:8000
```

### 📦 Déploiement

#### Option 1 : GitHub Pages (Gratuit)

1. Créer un repository GitHub
2. Pousser le code :
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin [votre-repo-url]
git push -u origin main
```

3. Activer GitHub Pages :
   - Settings → Pages
   - Source : main branch
   - Save
   - Le site sera disponible à : `https://[username].github.io/[repo-name]/`

#### Option 2 : Netlify (Gratuit)

1. Aller sur [netlify.com](https://netlify.com)
2. Drag & drop le dossier du projet
3. Le site est déployé instantanément avec HTTPS

#### Option 3 : Vercel (Gratuit)

1. Installer Vercel CLI :
```bash
npm i -g vercel
```

2. Déployer :
```bash
cd 3d-portfolio
vercel
```

#### Option 4 : Hébergement traditionnel (cPanel)

1. Compresser le dossier en ZIP
2. Se connecter au cPanel
3. File Manager → public_html
4. Upload et extraire le ZIP
5. Accéder via votre domaine

## ⚙️ Personnalisation

### 1. Informations Personnelles

Modifier dans `index.html` :
```html
<!-- Nom -->
<h1 class="hero-title">
    Votre Prénom
    <span class="gradient-text">Votre Nom</span>
</h1>

<!-- Email -->
<a href="mailto:votre@email.com">votre@email.com</a>

<!-- Réseaux sociaux -->
<a href="https://github.com/votre-username">GitHub</a>
<a href="https://linkedin.com/in/votre-profil">LinkedIn</a>
```

### 2. Couleurs et Thème

Modifier dans `css/styles.css` :
```css
:root {
    --accent-primary: #6366f1;    /* Couleur principale */
    --accent-secondary: #8b5cf6;  /* Couleur secondaire */
    --bg-primary: #0a0e27;        /* Fond principal */
    /* ... autres variables ... */
}
```

### 3. Ajouter des Projets

Dans `index.html`, section `#projects` :
```html
<div class="project-card" data-aos="fade-up">
    <div class="project-image">
        <img src="votre-image.jpg" alt="Description">
        <div class="project-overlay">
            <div class="project-links">
                <a href="lien-projet" class="project-link">
                    <i class="fas fa-external-link-alt"></i>
                </a>
                <a href="lien-github" class="project-link">
                    <i class="fab fa-github"></i>
                </a>
            </div>
        </div>
    </div>
    <div class="project-content">
        <div class="project-category">Catégorie</div>
        <h3>Nom du Projet</h3>
        <p>Description du projet...</p>
        <div class="project-tech">
            <span class="tech-badge">Tech 1</span>
            <span class="tech-badge">Tech 2</span>
        </div>
    </div>
</div>
```

### 4. Modifier les Compétences

Dans `index.html`, section `#skills` :
```html
<div class="skill-card">
    <div class="skill-icon">
        <i class="fab fa-html5"></i>
    </div>
    <div class="skill-info">
        <h4>Nom de la Compétence</h4>
        <div class="skill-bar">
            <div class="skill-progress" data-progress="95"></div>
        </div>
        <span class="skill-percentage">95%</span>
    </div>
</div>
```

### 5. Configuration 3D

Modifier dans `js/three-scene.js` :
```javascript
// Nombre de particules
const particleCount = 500; // Augmenter pour plus de particules

// Couleurs des formes 3D
const material = new THREE.MeshPhongMaterial({
    color: 0x6366f1, // Changer la couleur
    // ...
});
```

## 🎨 Personnalisation Avancée

### Ajouter une Nouvelle Section

1. **HTML** - Ajouter dans `index.html` :
```html
<section id="ma-section" class="section ma-section-class">
    <div class="container">
        <div class="section-header" data-aos="fade-up">
            <span class="section-tag">&lt;ma-section&gt;</span>
            <h2 class="section-title">
                Mon Titre <span class="gradient-text">Stylé</span>
            </h2>
            <p class="section-subtitle">Sous-titre</p>
        </div>
        
        <!-- Contenu de votre section -->
        
        <div class="section-footer" data-aos="fade-up">
            <span class="section-tag">&lt;/ma-section&gt;</span>
        </div>
    </div>
</section>
```

2. **CSS** - Ajouter dans `css/styles.css` :
```css
.ma-section-class {
    /* Vos styles personnalisés */
}
```

3. **Navigation** - Ajouter dans le menu :
```html
<a href="#ma-section" class="nav-link" data-section="ma-section">
    <i class="fas fa-icon"></i>
    <span>Ma Section</span>
</a>
```

### Personnaliser les Animations

Modifier dans `js/animations.js` :
```javascript
// Durée des animations
duration: 1, // en secondes

// Type d'easing
ease: 'power3.out', // Options : power1-4, back, elastic, bounce

// Délais entre animations
stagger: 0.2 // délai entre chaque élément
```

## 📱 Responsive Breakpoints

Les breakpoints sont définis dans `css/styles.css` :
```css
/* Tablette */
@media (max-width: 1024px) { }

/* Mobile */
@media (max-width: 768px) { }
```

## 🔧 Dépannage

### Les animations ne fonctionnent pas
- Vérifier que GSAP et Three.js sont chargés (console du navigateur)
- Vérifier les erreurs JavaScript dans la console
- S'assurer que le site est servi via HTTP (pas file://)

### Les images ne s'affichent pas
- Vérifier les chemins des images dans index.html
- S'assurer que les images sont dans le dossier assets/images/
- Vérifier les permissions du serveur

### Le site est lent
- Réduire le nombre de particules dans three-scene.js
- Optimiser/compresser les images
- Désactiver les effets optionnels (cursor trail, etc.)

### Le mode sombre ne fonctionne pas
- Vérifier que le bouton theme-toggle existe
- Vérifier localStorage dans les outils développeur
- Effacer le cache du navigateur

## 🎯 Optimisations de Performance

### Images
```bash
# Optimiser avec ImageMagick
convert image.jpg -quality 85 -resize 1920x1080 image-optimized.jpg

# Ou utiliser des outils en ligne :
# - TinyPNG.com
# - Squoosh.app
```

### Code
- Minifier CSS/JS pour production
- Utiliser des CDN pour les bibliothèques
- Activer la compression gzip sur le serveur
- Utiliser le cache du navigateur

## 📊 Métriques de Performance

### Tests recommandés :
- **Google PageSpeed Insights** : https://pagespeed.web.dev/
- **GTmetrix** : https://gtmetrix.com/
- **WebPageTest** : https://www.webpagetest.org/

### Objectifs :
- ✅ Score Performance > 90
- ✅ First Contentful Paint < 1.5s
- ✅ Time to Interactive < 3s
- ✅ Cumulative Layout Shift < 0.1

## 🔐 SEO & Meta Tags

Les meta tags sont déjà configurés dans `index.html`. Personnaliser :
```html
<meta name="description" content="Votre description">
<meta name="keywords" content="vos, mots-clés">
<meta property="og:title" content="Votre Titre">
<meta property="og:description" content="Votre Description">
```

Ajouter un fichier `robots.txt` :
```
User-agent: *
Allow: /
Sitemap: https://votredomaine.com/sitemap.xml
```

## 📝 Formulaire de Contact

Le formulaire est actuellement en mode simulation. Pour le rendre fonctionnel :

### Option 1 : FormSubmit (Simple)
```html
<form action="https://formsubmit.co/votre@email.com" method="POST">
    <!-- Vos champs -->
</form>
```

### Option 2 : EmailJS (Gratuit)
1. Créer un compte sur [EmailJS.com](https://www.emailjs.com/)
2. Configurer un service email
3. Remplacer dans `js/main.js` :
```javascript
emailjs.send("service_id", "template_id", data)
    .then(() => {
        this.showFormSuccess();
    });
```

### Option 3 : Backend personnalisé (PHP/Node.js)
Créer un endpoint API et l'appeler depuis `handleFormSubmission()`.

## 🌟 Améliorations Futures

- [ ] Blog intégré
- [ ] Système de filtres pour les projets
- [ ] Mode offline (PWA)
- [ ] Multilingue (FR/EN)
- [ ] Analytics intégré
- [ ] Chatbot d'assistance
- [ ] Téléchargement de CV
- [ ] Galerie photos/vidéos

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer.

## 👨‍💻 Auteur

**Mohamed Ayman Ennajy**
- Full Stack Developer
- 📧 Email : aymanennajy@gmail.com
- 🐙 GitHub : [@aymanennajy](https://github.com/aymanennajy)
- 💼 LinkedIn : [Ayman Ennajy](https://linkedin.com/in/ayman-ennajy)

---

## 🆘 Support

Pour toute question ou problème :
1. Consulter cette documentation
2. Vérifier la console du navigateur pour les erreurs
3. Contacter via email ou GitHub

## 🙏 Remerciements

- Three.js community
- GSAP for amazing animations
- Font Awesome for icons
- Unsplash for placeholder images

---

**Créé avec ❤️ et ☕ par Mohamed Ayman Ennajy**

*Dernière mise à jour : Décembre 2024*