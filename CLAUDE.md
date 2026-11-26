# Mon Trajet : Apprendre Langues — mode d'emploi technique

Application iOS (Capacitor 7) **uniquement audio, mains libres** : des francophones apprennent
une langue en conduisant, en courant, en marchant. 22 langues, 1800 phrases par langue.
Une seule app sur l'App Store (bundle `com.tonstudio.montrajet.anglais`).

Ce fichier est le mode d'emploi du dépôt. L'état du projet et les décisions sont dans les
documents du projet Claude (résumé, méthode par groupes de langues, playbook de la voix
française, pistes d'amélioration). **Ce dépôt est public : aucun secret ici** (ni e-mail,
ni mot de passe, ni Shared Secret, ni clé privée). Le playbook de publication complet reste
dans le projet Claude ; `PLAYBOOK.md` du dépôt est la version courte d'origine, à ne pas enrichir.

## À qui on parle

Alexis, le propriétaire, n'est pas technicien, n'a pas de Mac et lit souvent sur son
téléphone. Lui répondre **en français, en langage simple, étape par étape**. Il teste à
l'oreille sur son iPhone, souvent en voiture.

## Structure

| Chemin | Rôle |
|---|---|
| `www/index.html`, `www/css/style.css` | L'écran (accueil, lecture, voix, achat) |
| `www/js/app.js` | Toute la logique : registre `LANGS`, construction des leçons (`buildLessonSegments`, `buildScriptSegments`), points de grammaire, évaluations, achats RevenueCat, corrections de la voix française (`FR_VOICE`, `frVoice`, `frQuestions`, `frIsolated`) |
| `www/data/<code>.js` | Le contenu d'une langue : `window.MT_DATA['<code>']` = 3 niveaux × 3 modules × 20 leçons × 10 phrases `{fr, tgt, ro?, lit?, note?}` ; une leçon peut porter `tip`, `tip2`, `vocab`, `series`, `wordlist`, `debut`, `script`. **Fichier généré : ne jamais le modifier à la main.** |
| `tools/build_data.js` | Fabrique `www/data/*.js` en appliquant les corrections ci-dessous |
| `tools/phrase_fix/<code>.json` | Corrections de phrases et de titres (`"0-0-3#2"` = niveau 1, module 1, leçon 4, phrase 3) |
| `tools/tips_fix/`, `tools/tips_say/` | Corrections des points de grammaire ; mots à faire lire par la voix native |
| `tools/extra/<code>.json` | Compléments : `vocab`, `series`, `notes`, `words`, `cats`, `debut`, `tips2`, `scripts`, `tipsReplace` |
| `tools/extra/gen/` | Chaîne de production du contenu (consignes, plans, scripts, contrôles). Chinois module 1 : `zh_m1_plan.js` → `zh_m1_prompt.md` → `zh_script_0-0-N.md` → `zh_m1_check_script.js` → `zh_m1_apply.js` |
| `tools/audit/` | Contrôles avant chaque build (voir `tools/audit/README.md`) |
| `ios-patch/*.swift` | Remplace le code iOS du plugin de synthèse vocale : lecture en séquence, écran verrouillé, CarPlay/Bluetooth, reprise après un appel (même avec un GPS au premier plan). Copié pendant le build. **Ne peut pas être compilé ici** : seul le build Codemagic le vérifie. |
| `codemagic.yaml` | Le build iOS (le dossier `ios/` est regénéré à chaque build, il n'est pas dans le dépôt) |
| `assets/icon.png` | L'icône source (1024 × 1024) |

Codes des langues : ar, bn, de, en, es, fa, he, hi, id, it, ja, ko, pl, ptbr, ptpt, ru, ta,
th, tr, vi, yue, zh.

## Commandes

```bash
# Reconstruire les données après une correction (affiche « inchangé » ou « MODIFIÉ »)
node tools/build_data.js            # toutes les langues
node tools/build_data.js zh ja      # seulement celles-ci

# Contrôles (tout doit être OK / 0 problème / « Erreurs JS : aucune »)
node --check www/js/app.js
node tools/audit/data_structure.js
node tools/audit/data_tips.js
node tools/audit/data_voices.js
node tools/audit/data_unquoted.js
NODE_PATH=$(npm root -g) node tools/audit/app_all_programs.js
NODE_PATH=$(npm root -g) node tools/audit/app_scenarios.js
NODE_PATH=$(npm root -g) node tools/audit/app_layout.js

# Chinois, module 1 (nouvelle méthode)
node tools/extra/gen/zh_m1_check_script.js <n>   # depuis tools/extra/gen
node tools/extra/gen/zh_m1_apply.js && node tools/build_data.js zh
```

Les trois contrôles `app_*` utilisent Playwright et Chromium avec un faux plugin natif
(`tools/audit/mock.js`). Ils vérifient l'enchaînement et le texte envoyé aux voix, **pas le
son** : la prononciation ne se juge que sur l'iPhone.

## Build et publication (Codemagic)

- Build lancé à la main dans Codemagic (workflow `ios-workflow`) sur la branche `main`, en
  indiquant à Alexis le commit à construire. Le build part automatiquement sur TestFlight.
- `APP_VERSION` dans `codemagic.yaml` = numéro affiché sur l'App Store. **À augmenter dès
  qu'une version a été approuvée par Apple**, sinon l'envoi est refusé (erreur 90062).
  Le numéro de build est automatique.
- Cible minimale iOS 15, imposée par une étape du build qui échoue si elle n'est pas appliquée.
- Achats : RevenueCat. Un achat unique par langue (`version_complete` pour l'anglais,
  `mt_lang_<code>` pour les autres) et l'abonnement « toutes les langues »
  (`mt_all_monthly`, `mt_all_yearly`, droit `all_languages`).

Procédure d'une nouvelle version :

1. Contrôles ci-dessus, commit, push sur `main`.
2. Build Codemagic, test sur l'iPhone par TestFlight (écoute réelle, en voiture si le sujet est l'audio).
3. Dans App Store Connect : nouvelle version, choisir le build, texte des nouveautés.
4. Avant d'envoyer : rappeler à Alexis **Confidentialité de l'app → Publier** et **Tarifs → Gratuit**.
5. Soumettre. Après approbation, augmenter `APP_VERSION` pour la suivante.

## Règles fixes

Travail
- Un seul build et une seule soumission par version : regrouper les changements.
- Toujours commit **et** push quand le dépôt a changé. Ne jamais éditer `www/data/*.js` à la main.
- Les textes pour l'App Store se donnent dans la conversation, un bloc de code par champ.
  Quand il faut des captures : iPhone **et** iPad, en fichiers.
- Ne jamais écrire le nombre de langues dans le sous-titre, la description ou le texte promotionnel.

Contenu et pédagogie
- Tout est dit, rien n'est lu : parler de l'**oral**, jamais d'écriture, d'alphabet ou de caractères.
- Dans un texte dit par la voix française, un mot de la langue apprise s'écrit entre « » :
  il est alors lu par la voix native.
- Le bilan à l'arrêt est **écrit seulement, jamais dit**. Pas de défis ni de compte à rebours pour l'instant.
- Pas deux points de grammaire à la suite. Points de grammaire dits phrase par phrase, lentement.
- Nouvelle méthode (chinois module 1) : une seule difficulté nouvelle à la fois, l'élève
  produit, rappels espacés, pas de cours de grammaire dans la leçon, une synthèse toutes les 5 leçons.

Voix française
- Toute correction de prononciation passe par une **règle générale** dans `FR_VOICE` /
  `frQuestions` / `frIsolated` (elle vaut pour les 22 langues), pas par une réécriture au
  cas par cas. Le texte affiché ne change pas, seule la voix change.
- Écrire le français normalement dans les données et les scripts : l'appli fait les
  corrections (mot à mot, verbe après « tu », questions dites sous forme soutenue, temps
  après les deux-points, mots isolés finissant par « e »…).
- Chaque règle ajoutée est reportée dans le playbook de la voix française (projet Claude).

Organisation
- Le dépôt GitHub est la seule source de vérité. Une conversation et une branche par
  chantier ; à la fin : contrôles, build, test sur l'iPhone, fusion dans `main`, mise à
  jour des documents du projet.
