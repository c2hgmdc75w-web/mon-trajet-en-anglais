# Mon Trajet : Apprendre Langues (app unique)

App iOS (Capacitor) 100 % audio pour apprendre une langue en conduisant, en courant ou en marchant. Depuis le 06/11/2026 elle regroupe les 8 langues (ex-apps séparées, refusées par Apple au titre de la règle 4.3) : allemand, anglais, arabe littéraire, espagnol, italien, japonais, portugais du Brésil, portugais du Portugal.

- Nom App Store : `Mon Trajet : Apprendre Langues` — Bundle ID historique de l'app Anglais : `com.tonstudio.montrajet.anglais`
- Contenu : `www/data/<code>.js` (généré par `node tools/build_data.js` depuis les 8 dépôts d'origine), chargé à la demande ; format commun `{fr, tgt, ro?, lit?}`.
- Registre des langues (voix, achat, entitlement) : `LANGS` en tête de `www/js/app.js`.
- Achats : un achat unique par langue (`version_complete` pour l'anglais — produit historique — et `mt_lang_<code>` pour les autres) + abonnement « Toutes les langues » (`mt_all_monthly`, `mt_all_yearly`, entitlement `all_languages`).
- CarPlay : `ios-patch/TextToSpeech.swift` remplace l'implémentation iOS du plugin TTS (phrases fabriquées en fichier audio puis jouées).
