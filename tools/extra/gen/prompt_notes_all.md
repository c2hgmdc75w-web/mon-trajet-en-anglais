# Leçons expliquées — consigne pour une langue (niveau 1, 600 phrases)

Tu écris, pour CHAQUE phrase du niveau 1 d'une langue, ce qu'une application audio
mains libres (francophones qui apprennent en conduisant, sans écran) va DIRE après
la phrase :

1. le **mot à mot** : chaque mot de la phrase en français, puis les mêmes mots dans
   la langue apprise, un par un, avec un petit temps entre chacun (association d'idées) ;
2. une **explication** très courte, dite par une voix française de l'iPhone, qui
   contient UN SEUL mot de la langue apprise, lu par la voix native.

Tout est écouté, jamais lu : chaque mot écrit sera prononcé.

## Fichiers (dossier tools/extra/gen/ du dépôt)

- Entrée : `in_all_<code>.json` — `{ "0-<module>-<leçon>": { module, title, grammaire_de_la_lecon, phrases: [ {fr, tgt, ro, lit}, … 10 ] } }`
  (`tgt` = phrase dans la langue, `ro` = transcription latine, `lit` = mot à mot existant, à titre d'aide).
- Sortie : trois fichiers JSON, un par module :
  `notes_<code>_0.json` (leçons "0-0-0" à "0-0-19"), `notes_<code>_1.json` ("0-1-*"), `notes_<code>_2.json` ("0-2-*").
  Format : `{ "0-0-0": [ {words, note, say}, … une entrée par phrase, dans l'ordre ], … }`
- Contrôle : `node check_notes_all.js <code>` (depuis ce dossier). Corrige jusqu'à « OK ».
  Écris module par module (un fichier, puis le suivant) pour ne pas tout perdre.

## 1. `words` : le mot à mot

Liste de paires `["français", "mot dans la langue"]`, dans l'ordre de la phrase cible.

- Les mots cibles mis bout à bout doivent redonner EXACTEMENT `tgt` (espaces et
  ponctuation ignorés) : copie-les tels qu'ils sont écrits dans `tgt` (mêmes voyelles,
  mêmes signes), sans en oublier, sans en ajouter.
- Découpage : un mot cible = un mot prononçable seul.
  - Langues à espaces (arabe, persan, hébreu, hindi, bengali, tamoul, russe, coréen) :
    en principe un mot écrit = une paire. Ne détache un préfixe ou une particule collée
    que s'il se prononce bien seul ; sinon garde le mot entier et traduis-le par
    plusieurs mots français (« à Tel Aviv », « dans la maison »).
  - Japonais, thaï, cantonais (sans espaces) : découpe en mots naturels ; les particules
    (は, を, に, 嘅, 啊, ครับ…) sont des paires à part.
- Côté français : des mots simples, à l'infinitif pour les verbes, prononçables seuls.
  Aucun crochet, parenthèse, barre, tiret de liaison inutile, signe « = ».
  Pour un mot grammatical sans équivalent : « petit mot de question », « petit mot de
  politesse », « petit mot du possessif », « petit mot du sujet », « petit mot du
  complément », « petit mot de l'action accomplie », etc. Pour un nom propre : le nom.

## 2. `note` : l'explication

Exemple (chinois, phrase « J'arrive de Paris. » = 我从巴黎来) :
`"En chinois, on dit d'où l'on vient avant le verbe. Depuis se dit « cóng ». Le verbe venir se place tout à la fin."`
avec `"say": { "cóng": "从" }`.

Règles :
- **Une seule idée** par phrase de la leçon : le point le plus utile ou le plus nouveau
  de CETTE phrase (ordre des mots, verbe qui ne se conjugue pas, particule, politesse,
  genre, mot de comptage, formule figée, ou à défaut un mot de vocabulaire important).
  Varie les idées d'une phrase à l'autre ; ne répète pas la même idée deux fois de suite.
- **2 ou 3 phrases françaises courtes** (130 caractères max chacune), chacune finie par
  un point. La voix française ne fait retomber l'intonation qu'au point : pas de longues
  phrases, pas de deux-points, pas d'incise.
- **Un seul mot (ou groupe très court) de la langue**, entre « », écrit en transcription
  latine (comme dans `ro`), et **il termine sa phrase** : `… se dit « cóng ».` Jamais de
  texte français après le » dans la même phrase.
- Aucune écriture de la langue dans `note` (seulement dans `say`). Aucun crochet,
  parenthèse, symbole, chiffre arabe si on peut l'écrire en lettres.
- Parle de l'ORAL : ce qu'on dit, comment on le dit. Jamais d'écriture, d'alphabet,
  d'orthographe ni de caractères.
- Français simple, naturel, exact. Vouvoiement exclu : on parle comme un prof sympa
  (« on dit », « on ajoute »). Le contenu doit être juste pour la langue : en cas de doute
  sur une règle, choisis une idée dont tu es sûr.

## 3. `say`

`{ "<texte exact entre « »>": "<le même mot écrit dans la langue>" }` — une seule entrée.
La valeur est lue par la voix native : écris-la dans l'écriture de la langue (avec les
voyelles/signes de `tgt` si `tgt` en a), sans lettres latines. De préférence la forme
exacte qui apparaît dans `tgt`.

## Voix française — à respecter (l'appli corrige déjà automatiquement certains points)

- « mot à mot » est automatiquement prononcé « mo ta mo » ; un mot isolé du mot à mot
  qui finit par « e » est automatiquement prononcé avec « eu » (je → jeu, être → êtreu).
  Tu écris donc normalement : « je », « être », « parce que ».
- Évite dans les notes les mots que la voix lit mal : abréviations (« ex. », « etc. »),
  sigles, symboles, nombres en chiffres, mots étrangers autres que le mot cité.
