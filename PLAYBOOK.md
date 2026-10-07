# Playbook : publier une nouvelle variante linguistique de l'app (ex. Français → Espagnol)

Ce document capitalise tout ce qui a été appris en publiant "Mon Trajet en Anglais" sur l'App Store, pour aller plus vite sur les prochaines langues. À relire en entier au début de toute nouvelle app du même type.

## Ce qui est déjà acquis (ne pas refaire)

- Compte Apple Developer Program : validé, utilisable pour toutes les apps.
- In-App Purchase Key (.p8) et App Store Connect API Key (.p8) : clés au niveau du compte/équipe Apple, pas par app — réutilisables telles quelles dans RevenueCat pour une nouvelle app (Issuer ID : 3fa3c592-7050-4586-a8aa-e4ef7d358794).
- Comptes RevenueCat et Codemagic existants.
- Moteur générique de l'app (app.js, data.js, sélecteur de niveaux, lecture audio TTS, logique RevenueCat initPurchases/buyPremium/restorePremium) — conçu pour être dupliqué, juste changer le contenu des leçons et les textes d'UI.
- Historique App Review Apple qui s'améliore à chaque app publiée avec succès (réduit le risque de blocage "Guideline 2.1 - compte limité" rencontré sur la 1ère app).

## Ce qu'il faut refaire à chaque nouvelle app

1. Nouveau Bundle ID (ex. com.tonstudio.monvoyage.espagnol), nouvelle app dans App Store Connect.
2. Nouveau Shared Secret (spécifique à chaque app, dans "Informations sur l'app" > "Secret partagé spécifique à l'app").
3. Ajouter l'app dans RevenueCat avec ce Bundle ID (vérifier qu'il n'y a PAS de point final dans le champ Bundle ID — source d'erreur rencontrée).
4. Attacher les clés IAP Key et ASC API Key déjà existantes à cette nouvelle app dans RevenueCat.
5. Créer le produit d'achat intégré (ex. version_complete_es) dans App Store Connect + dans RevenueCat.
6. Dupliquer codemagic.yaml en changeant le Bundle ID et les identifiants de certificats/profils.
7. Nouvelles captures d'écran (iPhone 6.5": 1242×2688 ou 1284×2778 px ; iPad 13": 2064×2752 px), description, sous-titre, mots-clés — traduits dans la langue cible.
8. Catégorie, confidentialité, classification d'âge, copyright, coordonnées contact — à refaire sur la nouvelle fiche (mais on sait maintenant exactement où ils se trouvent).
9. Build Codemagic → TestFlight → tester l'achat en sandbox.
10. Soumission à la review Apple — prévoir la réponse au "Guideline 2.1" si redemandée (template plus bas).

## Erreurs déjà rencontrées à éviter

- **Numéro de build non unique** : résolu avec `agvtool new-version -all $(date +%s)` dans codemagic.yaml (timestamp Unix comme build number).
- **Fichier .p8 mal nommé** : doit être EXACTEMENT `AuthKey_<KeyID>.p8` — Windows peut créer un double `.p8.p8` si "masquer les extensions" est activé. Toujours activer "Extensions de noms de fichiers" dans l'Explorateur avant de renommer.
- **Bundle ID avec point final dans RevenueCat** : fait échouer la validation de la clé IAP — toujours vérifier qu'il n'y a pas d'espace ou de point parasite.
- **Produit IAP introuvable par StoreKit tant que l'app n'a jamais été soumise en review** : c'est une exigence Apple, pas un bug de config. Il faut soumettre l'app à la review (même juste une fois) pour débloquer le fetch du produit en sandbox/TestFlight.
- **Émojis dans la description App Store Connect** → bloque la validation ("caractères non validés"). Description doit être emoji-free.
- **"Connexion requise" coché par erreur** alors que l'app n'a pas de login → bloque la soumission si les champs identifiants sont vides. Bien décocher.
- **Ctrl+F dans l'éditeur web GitHub** : ne fonctionne que si on clique d'abord dans la zone de code (sinon c'est la recherche navigateur qui se lance et qui ne trouve rien dans le DOM virtualisé).

## Template de réponse Apple "Guideline 2.1 - Information Needed" (nouveau compte développeur)

Normalement ne se reproduit qu'une fois (le temps que le compte ait un historique). Si ça revient, réutiliser ce template en l'adaptant à la langue de l'app :

```
1. App purpose and target audience:
[Nom app] is a 100% audio, hands-free [langue source -> langue cible] learning app...

2. How to access main features:
No account/login required. Tap "Demarrer" to begin Lesson 1 (free)...

3. External services used:
- RevenueCat (in-app purchase management)
- Native iOS Text-to-Speech (Capacitor plugin) - no third-party AI/voice service
- No analytics, no ads, no external content servers (all content bundled locally)

4. Regional differences: None, app behaves identically in all regions.

5. Regulated industry / protected material: Not applicable.

6. In-App Purchase overview:
Single non-consumable IAP "[nom produit]" at [prix]EUR, unlocks all lessons
beyond the free tier. Accessed via paywall screen reached by tapping a locked lesson.
```

Accompagné d'une vidéo d'écran filmée depuis l'iPhone (Centre de contrôle > ajouter "Enregistrement de l'écran" via le + en haut à gauche de la page de personnalisation), envoyée via un lien Google Drive en partage "Tous les utilisateurs disposant du lien" (format `/view?usp=sharing`, pas `/edit`).

## Script de redimensionnement des captures d'écran (Python/PIL)

Pour générer les tailles iPhone 6.5" (1284x2778) et iPad 13" (2064x2752) à partir de captures iPhone brutes :

```python
from PIL import Image

def resize_for_store(src_path, out_path, target_size, pad_color=(245,245,247)):
    im = Image.open(src_path).convert("RGB")
    scale = target_size[1] / im.height
    new_w, new_h = int(im.width * scale), target_size[1]
    im_resized = im.resize((new_w, new_h), Image.LANCZOS)
    canvas = Image.new("RGB", target_size, pad_color)
    x = (target_size[0] - new_w) // 2
    canvas.paste(im_resized, (x, 0))
    canvas.save(out_path, "PNG")

# iPhone 6.5"
resize_for_store("screenshot.png", "iphone_out.png", (1284, 2778))
# iPad 13"
resize_for_store("screenshot.png", "ipad_out.png", (2064, 2752))
```

## Pour aller plus vite la prochaine fois

- Donner un accès GitHub en écriture (push) à la session Claude supprimerait tout le cycle "éditer via l'éditeur web GitHub en copier-coller" — Claude pourrait modifier app.js/codemagic.yaml/data.js directement.
- Le contenu des leçons (phrases, traductions, grammaire) peut être généré directement par Claude dans la langue cible — demander une génération complète du data.js pour la nouvelle paire de langues plutôt que de l'écrire à la main.
- La description, le sous-titre et les mots-clés App Store peuvent aussi être rédigés/traduits par Claude en amont, prêts à copier-coller.
