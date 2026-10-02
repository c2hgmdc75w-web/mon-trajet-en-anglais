# Mon Trajet en Anglais — projet d'app

App d'apprentissage de l'anglais mains-libres **et sans les yeux** (voiture,
course à pied) pour francophones. Chaque leçon se déroule intégralement à la
voix, sans aucun tap nécessaire pour avancer : introduction → aperçu des
phrases en français → apprentissage (français, puis anglais répété deux
fois avec un temps de silence pour répéter à voix haute) → deux phases de
test parlées → clôture → point de grammaire lu à voix haute si la leçon en
a un → enchaînement automatique sur la leçon suivante.
**Aucune reconnaissance vocale** : l'app n'écoute jamais l'utilisateur, les
temps de silence sont uniquement chronométrés.

> Premier maillon d'une famille d'apps prévue (français → anglais, allemand,
> etc.) — voir la section « Vision corpus multi-langues » en bas de ce
> document pour comment réutiliser ce projet pour les langues suivantes.

## Niveaux

L'app supporte désormais plusieurs **niveaux** (onglets en haut de l'accueil,
au-dessus des onglets de module) : même structure de 3 modules × 20 leçons ×
10 phrases par niveau, mais des situations différentes et un vocabulaire plus
riche à chaque niveau supérieur (jamais un remake des mêmes scènes). Un seul
achat premium débloque tous les modules payants, sur tous les niveaux.

- **Niveau 1** — terminé : 600 phrases, 3 modules, 15 points de grammaire.
- **Niveau 2** — en cours : Module 1 « Le quotidien » terminé (200 phrases,
  20 leçons, 5 points de grammaire, leçons 1-10 gratuites comme au niveau 1).
  Modules 2 « En voyage » et 3 « Conversation sociale » restent à rédiger
  (structure posée, verrouillée, prête à être remplie dans `data.js`).

Pour ajouter un niveau 3 (ou compléter le niveau 2), suivre exactement le
même schéma dans `www/js/data.js` : un tableau de leçons par module, puis un
objet `LEVELN_MODULES` et `LEVELN_FREE_LESSONS` ajoutés au tableau `LEVELS`.
Aucune autre modification du moteur (`app.js`) n'est nécessaire — il lit déjà
`LEVELS` dynamiquement.

## Ce qui est déjà fait

- Web app complète (`www/`) : écran d'accueil avec sélecteur de niveau,
  lecteur de leçon 100% audio-automatique, points de grammaire parlés,
  paywall.
- Chapitre d'orientation « Bien commencer ensemble » avant la leçon 1 du
  module 1 : explique à l'oral que la qualité de la voix dépend du
  téléphone, et détecte automatiquement iOS/Android (`detectPlatform()`
  dans `app.js`) pour donner le bon chemin de réglages système à suivre.
  Facultatif, rejouable à tout moment depuis l'accueil.
- Navigation ±10 secondes et barre de progression dans une leçon (le
  lecteur précompile chaque leçon en segments parole/silence pour
  permettre de sauter à un point précis sans perdre l'ordre mélangé du
  test 1).
- Points de contrôle « Évaluation » : toutes les 5 leçons (après les
  leçons 5, 10 et 15 de chaque module), une révision orale de 20
  phrases choisies aléatoirement parmi les 5 dernières leçons, dans le
  même format que le Test 2 (mêmes temps de réponse/répétition). Une
  « Évaluation finale » (60 phrases choisies dans tout le module) suit
  le point de grammaire de la leçon 20 et remplace le contrôle qui
  aurait sinon été redondant à cet endroit. Numérotation continue sur
  tout le parcours (« Évaluation 1, 2, 3... »), comme les points de
  grammaire. Chaque évaluation apparaît comme une ligne à part dans la
  liste des leçons, rejouable indépendamment depuis l'accueil.
- Déroulé d'une leçon entièrement scripté et automatique (voir
  `www/js/app.js`, fonction `playLessonFlow`) : intro parlée (numéro +
  titre) → aperçu de toutes les phrases françaises → apprentissage
  phrase par phrase (FR une fois, EN deux fois, avec un temps de silence
  après chaque écoute anglaise pour répéter) → Test 1 (ordre mélangé,
  question en français, réponse redonnée deux fois) → Test 2 (ordre
  d'origine, même principe) → message de clôture (spécial pour la toute
  première leçon, générique ensuite) → point de grammaire annoncé et lu
  à voix haute si la leçon en a un ("Point grammaire 1, 2, 3...",
  numérotés en continu sur tout le parcours) → **la leçon suivante
  démarre automatiquement**, sans aucune action de l'utilisateur — sauf
  si elle est verrouillée, auquel cas le paywall s'ouvre.
- Les boutons Précédent/Suivant permettent de sauter une leçon entière
  en avant/arrière ; le bouton lecture/pause met en pause ou reprend la
  synthèse vocale en cours.
- **Les 3 modules sont entièrement rédigés — 60 leçons, 600 phrases** :
  - Module 1 « Le quotidien » (200 phrases) : leçons 1-10 gratuites (dont 5
    en immersion road trip USA), leçons 11-20 payantes.
  - Module 2 « En voyage » (200 phrases, payant) : aéroport, transports,
    hôtel, tourisme, argent, urgences, rencontres.
  - Module 3 « Conversation sociale » (200 phrases, payant) : se présenter,
    famille, goûts, émotions, débattre poliment, réconforter, féliciter,
    conversation profonde entre amis.
- 15 points de grammaire intégrés (5 par module), schéma « toutes les 3
  leçons sur 10, puis toutes les 5 leçons sur 10 » à chaque fois : depuis/for/
  since, do/does, won't, going to, there is/are, already, participes
  irréguliers, le cas possessif, comparatifs, should, mots de liaison,
  question tags, etc.
- Paywall avec 10 leçons gratuites (module 1 uniquement), le reste payant.
- Design system cohérent (dark, glanceable, une couleur par phase).
- Vérifié : syntaxe JS propre, 600/600 phrases comptées automatiquement.

## Ce qu'il reste à faire

Le contenu est terminé. Ce qui reste concerne la mise en production :
- Tester réellement l'app sur ton iPhone (voir étapes ci-dessous).
- Brancher un vrai système d'achat intégré (le paywall est un stub pour
  l'instant — voir section dédiée plus bas).
- Relire/ajuster le contenu si certaines phrases ou tournures ne te
  conviennent pas — c'est le moment le plus simple pour le faire, tout est
  dans un seul fichier (`www/js/data.js`).
- Le contenu se rédige dans `www/js/data.js`, en suivant exactement le même
  format que les leçons déjà écrites. Dis-moi quand tu veux que je continue
  la rédaction — je peux enchaîner leçon par leçon dans une prochaine
  réponse (600 phrases avec contexte culturel, ça représente beaucoup de
  texte, donc je le fais par lots plutôt que tout d'un coup).

## Important : ce que ce projet EST et N'EST PAS

Ce dossier est un vrai projet **Capacitor** (web app encapsulée en app
native). Je peux écrire tout le code et le contenu, mais je ne peux pas,
depuis cet environnement :
- exécuter `npm install` (pas d'accès réseau ici),
- générer le projet Xcode (`npx cap add ios` télécharge des dépendances),
- compiler, signer ou soumettre l'app sur l'App Store (il faut un Mac +
  Xcode + un compte Apple Developer, que je n'ai pas).

Tout ça se fait chez toi, avec les commandes ci-dessous.

## Étapes pour arriver sur l'App Store (et Google Play)

### 1. Préparer l'environnement (chez toi)
```bash
cd mon-trajet-en-anglais
npm install
```

### 2. Ajouter les plateformes natives
```bash
npx cap add ios       # nécessite Xcode (Mac uniquement)
npx cap add android    # nécessite Android Studio
npx cap sync
```

### 3. Ouvrir et lancer
```bash
npx cap open ios       # ouvre le projet dans Xcode
npx cap open android   # ouvre le projet dans Android Studio
```

### 4. Achat intégré (paiement) — code déjà en place, comptes à créer
Le code d'intégration **RevenueCat** est déjà écrit dans `www/js/app.js`
(`initPurchases`, `buyPremium`, `restorePremium`, `applyCustomerInfo`) :
- Tant que l'app tourne dans un navigateur classique (tests via
  `npx serve`), `window.Capacitor` n'existe pas → l'app reste
  automatiquement sur le mode test (déblocage immédiat, sans paiement),
  pour continuer à pouvoir tester comme avant.
- Dans l'app compilée (iOS/Android), le vrai flux RevenueCat
  (StoreKit / Play Billing) prend le relais automatiquement.

Ce qu'il reste à faire, uniquement côté comptes/configuration :
1. Créer un compte sur [revenuecat.com](https://www.revenuecat.com) (gratuit
   jusqu'à 2 500 $/mois de revenus suivis).
2. Créer le produit « version complète » dans **App Store Connect** et dans
   la **Google Play Console**, avec le **même identifiant produit** des
   deux côtés (ex. `version_complete`).
3. Dans RevenueCat, connecter les deux stores, créer un « entitlement »
   (ex. `premium`) rattaché à ce produit, et récupérer les deux clés API
   publiques (une iOS, une Android).
4. Coller ces valeurs dans `app.js`, tout en haut du bloc PAYWALL :
   `REVENUECAT_API_KEY_IOS`, `REVENUECAT_API_KEY_ANDROID`,
   `ENTITLEMENT_ID`, `PRODUCT_ID` (actuellement des `TODO_...`).
5. `npm install` (ajoute `@revenuecat/purchases-capacitor`), puis
   `npx cap sync` pour que le plugin natif soit inclus dans le projet.

Tester un vrai achat nécessite un appareil réel et un compte testeur
Sandbox (iOS) ou testeur interne (Android) — impossible à vérifier avant
d'avoir les comptes développeur créés (étape 5 ci-dessous).

### 5. Comptes nécessaires
- **Apple Developer Program** : 99 $/an, obligatoire pour publier sur
  l'App Store.
- **Google Play Console** : 25 $, paiement unique.

### 6. Soumission
- iOS : build dans Xcode → App Store Connect → renseigner fiche, captures
  d'écran, prix, puis soumettre à la revue Apple (quelques jours).
- Android : build dans Android Studio (.aab) → Google Play Console →
  fiche + revue (généralement plus rapide qu'Apple).

## Structure du projet

```
mon-trajet-en-anglais/
  package.json
  capacitor.config.json
  www/
    index.html
    css/style.css
    js/data.js     <- tout le contenu pédagogique est ici
    js/app.js       <- toute la logique de l'app
```

## Vision corpus multi-langues

Pour dupliquer ce projet vers d'autres langues (« Mon Trajet en Allemand »,
etc.), tout le moteur (`app.js`, `style.css`, `index.html`) est déjà
indépendant du contenu — seul `data.js` contient les phrases et le français
en dur.

Pour créer une nouvelle app de la famille :
1. Copie tout le dossier, donne-lui un nouveau nom
   (`mon-trajet-en-allemand`).
2. Réécris `www/js/data.js` avec les phrases dans la nouvelle langue cible
   (le champ `en` devient `de`, par ex.), et adapte les deux appels
   `speak(p.en, 'en', ...)` dans `app.js` en `speak(p.de, 'de', ...)`.
3. Change `appId` et `appName` dans `capacitor.config.json`, et `name`/
   `description` dans `package.json`.
4. Le design (couleurs, typographie, écrans, paywall, points de grammaire)
   reste identique — c'est ton identité de marque commune sur toute la
   famille d'apps.

Si tu veux, je peux t'aider à faire de ce projet un vrai **template**
réutilisable (fichier de config unique pour la langue cible au lieu de
dupliquer le code) une fois que celui-ci est validé sur l'App Store.
