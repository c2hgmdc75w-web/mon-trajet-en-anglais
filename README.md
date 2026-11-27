# Mon Trajet : Apprendre Langues (app unique)

App iOS (Capacitor 7) 100 % audio, mains libres, pour que des francophones apprennent une langue en conduisant, en courant ou en marchant. Une seule app sur l'App Store pour 22 langues : allemand, anglais, arabe littéraire, bengali, cantonais, chinois mandarin, coréen, espagnol, hébreu, hindi, indonésien, italien, japonais, persan, polonais, portugais du Brésil, portugais du Portugal, russe, tamoul, thaï, turc, vietnamien.

- Nom App Store : `Mon Trajet : Apprendre Langues` — Bundle ID historique de l'app Anglais : `com.tonstudio.montrajet.anglais`.
- Contenu : `www/data/<code>.js`, 1800 phrases par langue (3 niveaux × 3 modules × 20 leçons × 10 phrases), chargé à la demande ; format `{fr, tgt, ro?, lit?, note?}`. Fichiers générés par `node tools/build_data.js` à partir des corrections de `tools/` : ne jamais les modifier à la main.
- Registre des langues (groupe, voix, achat, entitlement) : `LANGS` en tête de `www/js/app.js`. Le champ `group` (A à F) range les langues selon leur éloignement du français à l'oral.
- Achats (RevenueCat) : un achat unique par langue (`version_complete` pour l'anglais — produit historique — et `mt_lang_<code>` pour les autres) + abonnement « Toutes les langues » (`mt_all_monthly`, `mt_all_yearly`, entitlement `all_languages`).
- Audio iOS : `ios-patch/*.swift` remplace l'implémentation iOS du plugin de synthèse vocale (lecture en séquence, écran verrouillé, CarPlay/Bluetooth, reprise après un appel).
- Build : Codemagic (`codemagic.yaml`), le dossier `ios/` est regénéré à chaque build.

Mode d'emploi technique complet (structure, commandes, règles) : `CLAUDE.md`. Contrôles avant chaque build : `tools/audit/README.md`.
