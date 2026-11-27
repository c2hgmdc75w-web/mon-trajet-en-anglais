# Contrôles avant chaque build

À lancer depuis la racine du dépôt. Tout doit être « RAS » / « OK » / « TOTAL problèmes 0 » / « Erreurs JS : aucune ».
Les compteurs `doublon_tgt` / `doublon_fr` et `non_say` sont de simples informations (même phrase dans deux leçons ;
passage entre « » laissé à la voix française). Pour juger un changement, comparer avec les résultats d'avant.

Données (aucune dépendance) :
- `node tools/audit/data_structure.js` — 22 langues : 3 niveaux × 3 modules × 20 leçons × 10 phrases, champs vides, écritures, transcriptions, mot à mot (`lit`), et mot à mot dit au niveau 1 (`note.words`) pour les 16 langues qui en ont un.
- `node tools/audit/data_tips.js` — points de grammaire : exemple « FR — cible » pris dans la leçon, guillemets équilibrés, mots natifs (say) cohérents avec le texte ; champ `group` présent dans `LANGS` pour chaque langue, et pour les groupes C à F exactement 4 synthèses dans le module 1 (après les leçons 5, 10, 15 et 20).
- `node tools/audit/data_voices.js` — passages entre « » : langue apprise non confiée à la voix native / français confié à la voix native (suspects à relire).
- `node tools/audit/data_unquoted.js` — mots de la langue apprise restés HORS guillemets (donc lus par la voix française).

Application (Playwright + Chromium, plugin natif simulé par `mock.js`) :
- `NODE_PATH=$(npm root -g) node tools/audit/app_all_programs.js` — construit toutes les leçons, points de grammaire et évaluations des 22 langues et vérifie chaque segment.
- `NODE_PATH=$(npm root -g) node tools/audit/app_scenarios.js` — 44 vérifications : intro, enchaînement, pause, ±10 s, suivant/précédent, fin gratuite, fin de module, langue sans voix, appel téléphonique, réveil de la page, nouvelle méthode du chinois.
- `NODE_PATH=$(npm root -g) node tools/audit/app_layout.js` — boutons toujours visibles sur 6 tailles d'écran (dont iPhone SE, paysage et iPad).

Ces contrôles vérifient l'enchaînement et le texte envoyé aux voix, **pas le son** : la prononciation ne se juge que sur l'iPhone.

Corrections de contenu : ne jamais éditer `www/data/*.js` à la main. Écrire dans `tools/phrase_fix`, `tools/tips_fix`, `tools/tips_say`, `tools/extra`
(voir l'en-tête de `tools/build_data.js`, et `lib_fix.js` pour le faire par script), puis `node tools/build_data.js`.
