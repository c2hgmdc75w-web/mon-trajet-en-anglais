# Contrôles avant chaque build (ajoutés le 11/11/2026)

À lancer depuis la racine du dépôt. Tout doit être « RAS » / « OK » / 0 problème.

Données (aucune dépendance) :
- `node tools/audit/data_structure.js` — 22 langues : 3 niveaux × 3 modules × 20 leçons × 10 phrases, champs vides, écritures, transcriptions, mot à mot.
- `node tools/audit/data_tips.js` — points de grammaire : exemple « FR — cible », guillemets équilibrés, mots natifs (say) cohérents avec le texte.
- `node tools/audit/data_voices.js` — passages entre « » : langue apprise non confiée à la voix native / français confié à la voix native (suspects à relire).
- `node tools/audit/data_unquoted.js` — mots de la langue apprise restés HORS guillemets (donc lus par la voix française).

Application (Playwright + Chromium, plugin natif simulé par `mock.js`) :
- `NODE_PATH=$(npm root -g) node tools/audit/app_all_programs.js` — construit toutes les leçons, points de grammaire et évaluations des 22 langues et vérifie chaque segment.
- `NODE_PATH=$(npm root -g) node tools/audit/app_scenarios.js` — 37 scénarios : intro, enchaînement, pause, ±10 s, suivant/précédent, fin gratuite, fin de module, langue sans voix, appel téléphonique, réveil de la page.
- `NODE_PATH=$(npm root -g) node tools/audit/app_layout.js` — boutons toujours visibles sur 6 tailles d'écran (dont iPhone SE et paysage).

Corrections de contenu : ne jamais éditer `www/data/*.js` à la main. Écrire dans `tools/phrase_fix`, `tools/tips_fix`, `tools/tips_say`
(voir l'en-tête de `tools/build_data.js`, et `lib_fix.js` pour le faire par script), puis `node tools/build_data.js`.
