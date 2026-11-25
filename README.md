# Floréol

Plateforme académique d’arrosage solaire de l’IFMEREE Tanger. Le prototype physique, ses modèles Blender et son animation web servent de base à une démonstration interactive de la gestion de l’eau et de l’énergie.

## Ouvrir la démonstration

1. Extraire intégralement `Floreol_Complete_Project.zip`.
2. Sous Windows, double-cliquer sur **Lancer_Floreol.cmd**. Le lanceur utilise Node.js 24 ou plus récent et le site déjà compilé dans `dist`.
3. Ouvrir [Floréol en local](http://127.0.0.1:4173/). Laisser la fenêtre de commande ouverte. Le serveur local fonctionne sans connexion Internet.

Sur macOS ou Linux, exécuter `node scripts/serve.mjs` depuis le dossier extrait. Une première ouverture en HTTP local est nécessaire pour le chargement des modules, du modèle et du service worker. Les modules météo externe et études importées disposent d’alternatives locales.

## Développer

Avec Node.js 24 ou supérieur et npm, dans ce dossier :

```sh
npm install
npm run dev
```

Ouvrir l’adresse indiquée par Vite. Pour compiler, lancer `npm run build`. La commande vérifie TypeScript et produit les ressources hors ligne. Utiliser `npm run preview` pour prévisualiser la distribution. Le build et l’installation nécessitent les dépendances de développement. Le serveur de démonstration intégré n’en a pas besoin.

| Parcours | Fonctionnement |
|---|---|
| Accueil et système | Véritable GLB, rotation, zoom, fiches des composants, animation embarquée, schéma et six chapitres |
| Control Center | Simulateur, eau, PV, pompe, bilan hydraulique, diagnostic, calendrier et scénarios |
| Études et météo | Prévisions distantes à la demande, scénario hors ligne, référence PVGIS de Tanger et imports PVGIS/PVsyst |
| Rapports | Historique filtré, graphiques, sauvegarde JSON, CSV et classeur XLSX à sept feuilles |
| Floréol AI | Moteur de règles contextuel local, six domaines. L’IA générative demande un backend et un fournisseur configurés |
| Mode jury | Douze étapes, lecture automatique, plein écran, clavier et remise à zéro volontaire |
| Projet et équipe | Conception, rendus Blender, rôles, encadrement et médias configurables |
| Connexion ESP32 | Adaptateur et passerelle optionnels, authentification et contrôle de fraîcheur. Le matériel reste à installer et à valider |

## Réglages et personnalisation

**Control Center → Paramètres** permet de changer la capacité du réservoir, le volume initial, la réserve, le débit, la dose, l’efficacité, la géométrie, la calibration, les caractéristiques électriques, le site et les seuils. Les champs techniques inconnus peuvent rester vides. **Paramètres → Panneau photovoltaïque** contient les préréglages de puissance. Pour remettre l’installation à ses valeurs initiales, sauvegarder d’abord les données désirées, puis utiliser le bouton de réinitialisation en mode jury.

Les textes et les rôles s’éditent dans `src/Project.tsx`. Le film de 16 secondes est tiré de l’animation originale du GLB. Les sources Blender utilisées pour les rendus se trouvent dans `design-sources/`. Les médias de galerie sont déclarés dans `src/gallery.ts`. Une vidéo MP4 de fonctionnement ou une photographie de fabrication validée peut être ajoutée dans `public/media` puis dans cette liste.

### Portraits et coordonnées

Les coordonnées, les fichiers de portraits personnels et les autorisations restent dans `.private/`, exclu de Git et du ZIP publiable. Les photos de Houssam, Hamza et Mme Hiba sont disponibles dans le projet local de travail. L’archive distribuable présente les initiales pour tout portrait absent ou sans accord. Le serveur de développement local affiche les portraits disponibles pour préparer la séance. La compilation de production inclut uniquement les portraits explicitement autorisés.

Pour activer une publication après accord :

- Ajouter les images WebP dans `.private/photos/` sous les noms `houssam.webp`, `hamza.webp`, `mohamed-ali.webp`, `wissal.webp` ou `hiba.webp`.
- Créer `.private/publication.json` avec `{"photos":[],"contacts":{}}`. Les identifiants sont HA, HH, MAT, WM et HHd. Ajouter dans `photos` uniquement les identifiants autorisés.
- Dans `.private/contacts.json`, chaque identifiant peut porter `email`, `phone` et `linkedin`. Dans le champ `contacts` de la configuration de publication, ajouter uniquement les canaux autorisés pour cet identifiant, par exemple `{"HA":["linkedin"]}`. Une adresse électronique contenant un espace est rejetée. Les boutons demeurent désactivés lorsque les renseignements sont absents.
- Redémarrer Vite après toute modification de la configuration privée. Vérifier localement le résultat de `npm run build`. En CI, seuls les fichiers d’accord explicitement rétablis depuis un stockage privé peuvent être publiés. La configuration par défaut du workflow publie les initiales.

## Vérification

```sh
npm test
npm run build
npm run dev
```

Dans un second terminal, exécuter `npm run test:ui`. Le script ouvre un profil Chromium de test distinct et écrit ses captures dans `docs/validation/`. Chrome installé sur Windows est détecté. Sur une autre machine, indiquer `CHROME_PATH` ou installer Chromium via Playwright. La variable `FLOREOL_TEST_URL` choisit un autre serveur. Les tests de navigateur et le moteur n’actionnent aucun équipement. Le fichier `docs/validation/parcours.json` présente les vérifications exécutées.

## Préparer GitHub Pages

1. Créer un dépôt sur GitHub. En local, ajouter les sources, le lockfile et le workflow. Vérifier la sélection des fichiers, en particulier les droits d’image, puis valider et envoyer la branche souhaitée au dépôt. La création du dépôt et l’envoi relèvent d’une décision de publication distincte.
2. Dans **Settings → Pages → Build and deployment**, choisir **GitHub Actions**.
3. Dans **Actions**, ouvrir **Publier Floréol sur Pages** et sélectionner **Run workflow** sur la branche de publication. La compilation utilise la base relative et les routes par fragment pour fonctionner sous le nom du dépôt.
4. Ouvrir l’URL retournée par GitHub. Pour livrer une mise à jour, envoyer les changements validés et relancer le workflow manuel. GitHub Pages héberge le frontend statique. Héberger séparément tout backend connecté.

Le workflow est préparé pour un déclenchement manuel. Le projet livré et sa démonstration locale n’exigent aucun dépôt distant. [Documentation GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

## Documentation

- [Guide de soutenance](docs/soutenance.md)
- [Architecture, calculs et IA facultative](docs/architecture.md)
- [Passerelle, firmware et vérifications matérielles](docs/iot.md)
- [Sources météo, PVGIS, PVsyst et formats acceptés](docs/sources.md)
- [Captures et vérifications](docs/validation/)

## Crédits

Maquette, logo, photographies et projets Blender fournis par l’équipe Floréol. Les rendus sont dérivés de ces sources. Les icônes proviennent de Lucide, les polices Manrope et IBM Plex Mono sont intégrées localement. Le code s’appuie sur React, Three.js, Vite, GSAP et ExcelJS. Les données externes et leurs conditions d’utilisation sont documentées dans les sources.