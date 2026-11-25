# Écrire le script audio d'une leçon de chinois (module 1, nouvelle méthode)

Application **uniquement audio** : des francophones débutants complets apprennent le mandarin
en conduisant, sans écran. Deux voix de synthèse : une voix française (**FR**) et une voix
chinoise (**中文**). Tout ce que tu écris est DIT. L'élève ne lit rien.

Tu écris le script complet d'une ou plusieurs leçons, sur le modèle exact de la leçon 1
(`zh_script_0-0-0.md`, à lire en entier d'abord), à partir du plan (`zh_m1_plan.js`).

## Fichiers (dossier `tools/extra/gen/`)

- `zh_m1_plan.js` : pour chaque leçon `n` — `title`, `elements` (les 5 à 7 éléments NOUVEAUX :
  `[français, chinois, pinyin, remarque possible]`), `ear` (l'exercice d'oreille), `phrases`
  (10 phrases de référence `[français, chinois, pinyin, mot à mot "fr|中 fr|中"]`).
- `zh_script_0-0-0.md` : la leçon 1, LE MODÈLE (ton, rythme, format). Attention : son français
  est écrit « pour l'oreille » (jeu, elleu, mo ta mo, tu va). **Toi, écris le français
  normalement** (je, elle, mot à mot, tu vas) : l'appli refait ces corrections toute seule.
- Sortie : `zh_script_0-0-<n-1>.md` pour la leçon `n` (leçon 2 → `zh_script_0-0-1.md`).
- Contrôle : `node zh_m1_check_script.js <n>` depuis ce dossier. Corrige jusqu'à « OK ».

## Principe pédagogique (à respecter absolument)

1. **Une seule difficulté nouvelle à la fois.** N'utilise QUE les mots du plan : les éléments
   des leçons 1 à n. Aucun autre mot chinois, jamais (le contrôle le vérifie caractère par caractère).
2. **L'élève produit.** Schéma de base : consigne ou phrase en français → silence (3 à 5 s,
   l'élève dit le chinois) → la réponse en chinois → silence (2 à 3,5 s, il répète).
3. **Chaque élément nouveau revient de plus en plus espacé** dans la leçon : tout de suite,
   puis une demi-minute plus tard, puis plus loin (au moins 5 fois en tout).
4. **La révision est dans la leçon** : rappel des leçons précédentes au début, mélange
   ancien + nouveau ensuite. On ne doit jamais avoir à réécouter une leçon.
5. **Pas de cours de grammaire.** Au plus **4 remarques** dans la leçon, d'UNE phrase courte
   chacune, au moment où la notion apparaît (les « remarques possibles » du plan sont des
   idées, pas une obligation). Le mot à mot fait passer le reste.
6. On parle de l'ORAL : jamais d'écriture, de caractères, d'alphabet ni de pinyin.

## Format (identique à la leçon 1)

```
# Script de la leçon N de chinois — « Titre »

## 1. Titre et objectif — ≈ 0 min 20 s

- **FR** — Leçon 2. D'où viens-tu ?
- **中文** — 你好。  *(Nǐ hǎo.)*
- *(silence 2,5 s)*
```

- Une ligne **FR** = une phrase ou deux phrases courtes dites d'une traite par la voix
  française. Un mot français seul (« venir ») s'écrit sans point : il sera dit comme un mot isolé.
- Une ligne **中文** = le chinois, puis deux espaces, puis le pinyin entre `*(` et `)*`.
  Reprends EXACTEMENT les caractères et le pinyin du plan pour les phrases de référence et
  les éléments. Pour une phrase que tu composes, écris le pinyin avec les tons, en appliquant
  les changements de ton courants (bù → bú devant un ton descendant ; yī → yì ou yí).
- `*(silence 3,5 s)*` = temps laissé à l'élève (entre 1,5 et 6 s, virgule décimale).
- Titres de partie : `## 3. Titre — ≈ 1 min 30 s`.
- Français : phrases courtes finies par un point, tutoiement, ton chaleureux et simple ;
  aucun crochet, parenthèse, barre, symbole, abréviation ; pas de chiffres dans les phrases
  (sauf « Leçon 2. »).

## Les parties d'une leçon (dans cet ordre, mêmes titres)

1. **Titre et objectif** (≈ 20 s) : « Leçon N. Titre. » + une phrase d'objectif concrète
   (« Aujourd'hui, tu vas apprendre à dire d'où tu viens et où tu vas. »).
2. **Rappel** (≈ 2 min) : « On commence par quelques phrases que tu connais. » puis 6 à 8
   groupes [phrase FR → silence 4 à 5 s → 中文 → silence 3 s], SANS aide. Obligatoire : au
   moins 3 phrases de référence de la leçon n-1, au moins 1 de la leçon n-3 et 1 de la leçon
   n-7 (quand elles existent), prises telles quelles dans le plan.
3. **Oreille** (≈ 1 min 30) : l'exercice du champ `ear`. Uniquement avec des syllabes de mots
   connus ou nouveaux de la leçon. Exemple de forme : la voix française annonce ce qu'on va
   écouter, on entend les deux mots chinois l'un après l'autre, puis 4 à 6 questions
   [中文 → silence 2,5 s → la voix française donne la réponse en une courte phrase, par
   exemple « Celui-là descend. C'est aller. »]. Décris les tons par des images simples
   (haut et plat, monte, descend, grave) — pas de numéros de tons.
4. **Les nouveautés** : une partie par élément ou par petit groupe d'éléments (titre = le
   sens en français, comme « Venir, je » dans la leçon 1). Pour chaque élément : le mot
   français seul → 中文 → silence → 中文 → silence ; une phrase d'exemple (FR → 中文 ×2 avec
   silences) ; « Traduction mot à mot. » puis l'alternance mot français / mot chinois (prise
   dans le plan) ; éventuellement UNE remarque ; puis « À toi. » avec 2 à 4 groupes
   [FR → silence → 中文 → silence] qui mélangent le nouvel élément et des mots anciens.
   Les mots longs se construisent en partant de la fin (chē → zūchē → chūzūchē).
5. **On mélange** (≈ 2 min) : « Maintenant, on mélange tout. » puis 6 à 8 groupes
   [FR → silence 4 à 5 s → 中文 → silence 3 s] : des phrases NOUVELLES, faites uniquement de
   mots connus, qui combinent la leçon du jour avec les précédentes. C'est le moment où
   l'élève sent qu'il parle.
6. **Petite conversation** (≈ 1 min 15) : « Écoute cette petite conversation. Tu connais déjà
   tous les mots. » 4 à 6 répliques 中文 d'affilée ; puis « Encore une fois, et dis le sens en
   français pendant le silence. » et les mêmes répliques, chacune suivie d'un silence de 3 s
   et de sa traduction FR.
7. **Test** (≈ 1 min 30) : « Le test. Je dis une phrase en français, tu la dis en chinois. »
   puis 7 à 9 groupes [FR → silence 4 à 5 s → 中文] (pas de silence après la réponse :
   l'appli l'ajoute, et elle joue ces groupes dans le désordre). Au moins 2 phrases de
   leçons précédentes.
8. **Clôture** (≈ 20 s) : « Bravo. » + ce que l'élève sait dire maintenant, concrètement +
   « Demain, la leçon suivante commencera par ces phrases. » et un silence de 3 s.

Les 10 phrases de référence de la leçon doivent TOUTES être dites au moins une fois.
Durée visée : 12 à 15 minutes (le contrôle l'estime).

## Qualité

- Le chinois doit être juste et naturel. Si une combinaison te semble douteuse, ne l'utilise pas.
- Varie les consignes sans les allonger. Encourage brièvement de temps en temps
  (« Très bien. », « Tu vois, tu sais déjà le dire. ») — une courte phrase, pas plus.
- Ne modifie aucun autre fichier que tes scripts. Ne fais aucun commit.
