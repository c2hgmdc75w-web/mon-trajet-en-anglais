// node tools/extra/gen/zh_m1_apply.js
// Installe le module 1 de chinois « nouvelle méthode » à partir du plan (zh_m1_plan.js) et
// des scripts (zh_script_0-0-<i>.md) : phrases et titres, vocabulaire des évaluations,
// scripts, synthèses toutes les 5 leçons ; retire l'ancien habillage du module (points de
// grammaire après chaque leçon, explications, séries, leçons « débutant »).
// Relançable sans effet de bord. Ensuite : node tools/build_data.js zh
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const plan = require('./zh_m1_plan.js');
const T = f => path.join(__dirname, '..', '..', '..', f);
const read = f => JSON.parse(fs.readFileSync(T(f), 'utf8')), write = (f, o) => fs.writeFileSync(T(f), JSON.stringify(o, null, 1) + '\n');
const pairs = lit => lit.split(/(?<=\p{Script=Han})\s/u).map(x => x.split('|'));

// 1. scripts (leçon 1 comprise)
for (const L of plan) {
  const f = path.join(__dirname, `zh_script_0-0-${L.n - 1}.md`);
  if (!fs.existsSync(f)) throw new Error('script manquant : ' + f);
  execFileSync('node', [path.join(__dirname, 'script_to_json.js'), 'zh', `0-0-${L.n - 1}`, f], { stdio: 'ignore' });
}
const E = read('tools/extra/zh.json'), P = read('tools/phrase_fix/zh.json'), TF = read('tools/tips_fix/zh.json'), TS = read('tools/tips_say/zh.json');
const inM1 = k => /^0-0-\d+(#\d+)?$/.test(k);

// 2. phrases, titres, vocabulaire
for (const k of Object.keys(P)) if (inM1(k)) delete P[k];
E.vocab = E.vocab || {};
for (const L of plan) {
  const id = `0-0-${L.n - 1}`;
  P[id] = { title: L.title };
  L.phrases.forEach(([fr, tgt, ro, lit], i) => { P[`${id}#${i}`] = { fr, tgt, ro, lit: pairs(lit).map(x => x[0]).join(' · ') }; });
  const voc = L.elements.filter(e => !/^petit mot/.test(e[0])).slice(0, 6).map(([fr, tgt, ro]) => ({ fr: fr.replace(/,.*$/, ''), tgt, ro }));
  // complète à 6 mots avec ceux de la leçon précédente si la leçon en introduit moins
  const prev = plan.find(x => x.n === L.n - 1);
  for (const e of (prev ? prev.elements : [])) { if (voc.length >= 6) break; if (!/^petit mot/.test(e[0]) && !voc.some(v => v.tgt === e[1])) voc.push({ fr: e[0].replace(/,.*$/, ''), tgt: e[1], ro: e[2] }); }
  E.vocab[id] = voc;
}

// 3. ancien habillage du module 1 retiré
for (const key of ['notes', 'words', 'series', 'tips2']) if (E[key]) for (const k of Object.keys(E[key])) if (inM1(k)) delete E[key][k];
E.debut = (E.debut || []).filter(k => !inM1(k));
for (const k of Object.keys(TF)) if (inM1(k)) delete TF[k];
for (const k of Object.keys(TS)) if (inM1(k)) delete TS[k];

// 4. plus de point de grammaire après chaque leçon : une synthèse toutes les 5 leçons
const SYN = {
 '0-0-4': { title: 'Ce que tu sais déjà sur les phrases chinoises', phrase: 0,
  body: "Tu as fait cinq leçons. Voici ce que tu as déjà compris, sans cours de grammaire. Premièrement, le verbe ne change jamais. Je viens se dit « wǒ lái ». Ils viennent se dit « tāmen lái ». Deuxièmement, pour poser une question, on garde la phrase et on ajoute un petit mot à la fin. Tu viens ? se dit « nǐ lái ma ». Troisièmement, pour dire non, on met un petit mot juste devant le verbe. Il ne vient pas se dit « tā bù lái ». Quatrièmement, les petits mots comme aussi ou avec se placent avant le verbe. Elle y va aussi se dit « tā yě qù ». Enfin, le lieu où l'on va vient juste après le verbe, sans petit mot. Nous allons à Pékin se dit « wǒmen qù Běijīng ». Tout le reste, ce sont des mots à assembler.",
  say: { 'wǒ lái': '我来', 'tāmen lái': '他们来', 'nǐ lái ma': '你来吗', 'tā bù lái': '他不来', 'tā yě qù': '她也去', 'wǒmen qù Běijīng': '我们去北京' } },
 '0-0-9': { title: 'Décrire, compter, demander poliment', phrase: 8,
  body: "Dix leçons de faites. Voici trois idées que tu utilises déjà. Première idée, pour décrire, pas de verbe être. On met très devant le mot. Le thé est bon se dit « chá hěn hǎohē ». Pour dire le contraire, on remplace très par ne pas. Ce n'est pas cher se dit « bú guì ». Deuxième idée, pour compter une boisson, on dit toujours le nombre, puis la tasse, puis la boisson. Deux thés se dit « liǎng bēi chá ». Et les dizaines se fabriquent comme un calcul. Trente, c'est trois dix : « sānshí ». Troisième idée, pour demander poliment, on commence par s'il vous plaît. Donnez-moi de l'eau se dit « qǐng gěi wǒ shuǐ ». Et pour dire qu'on a envie de quelque chose, on met le mot envie devant le verbe. J'ai envie d'acheter du thé se dit « wǒ xiǎng mǎi chá ».",
  say: { 'chá hěn hǎohē': '茶很好喝', 'bú guì': '不贵', 'liǎng bēi chá': '两杯茶', 'sānshí': '三十', 'qǐng gěi wǒ shuǐ': '请给我水', 'wǒ xiǎng mǎi chá': '我想买茶' } },
 '0-0-14': { title: 'Être, avoir, et dire à qui c\'est', phrase: 1,
  body: "Quinze leçons de faites. Faisons le point sur trois petits mots. Le premier, c'est être. On ne l'emploie que devant un nom. Je suis touriste se dit « wǒ shì yóukè ». Devant un mot qui décrit, on ne le met jamais. La Cité interdite est immense se dit « Gùgōng hěn dà ». Le deuxième, c'est le petit mot du possessif. Il se place après la personne. Nos billets se dit « wǒmen de piào ». Pour un proche, on s'en passe. Mon ami se dit « wǒ péngyou ». Le troisième, c'est avoir, qui sert aussi à dire il y a. J'ai un plan se dit « wǒ yǒu dìtú ». Attention, avoir a sa propre négation. Je n'ai pas de billet se dit « wǒ méiyǒu piào ».",
  say: { 'wǒ shì yóukè': '我是游客', 'Gùgōng hěn dà': '故宫很大', 'wǒmen de piào': '我们的票', 'wǒ péngyou': '我朋友', 'wǒ yǒu dìtú': '我有地图', 'wǒ méiyǒu piào': '我没有票' } },
 '0-0-19': { title: 'Le moment, les questions, trop et pas trop', phrase: 9,
  body: "Tu as terminé le premier module. Voici les dernières idées à garder en tête. Première idée, le moment se dit avant le verbe, et il n'y a pas de futur. Demain, nous allons à la Cité interdite se dit « wǒmen míngtiān qù Gùgōng ». Deuxième idée, les mots de question se mettent là où serait la réponse. Tu cherches quoi ? se dit « nǐ zhǎo shénme ». Tu habites où ? se dit « nǐ zhù zài nǎr ». Troisième idée, pour dire trop, on ajoute souvent un petit mot à la fin. C'est trop cher se dit « tài guì le ». Et pour adoucir, on dit pas trop : « bú tài guì ». Dernière idée, pour un savoir appris, comme une langue, on emploie un verbe spécial. Je parle un peu chinois se dit « wǒ huì shuō yìdiǎnr Zhōngwén ». Et c'est vrai.",
  say: { 'wǒmen míngtiān qù Gùgōng': '我们明天去故宫', 'nǐ zhǎo shénme': '你找什么', 'nǐ zhù zài nǎr': '你住在哪儿', 'tài guì le': '太贵了', 'bú tài guì': '不太贵', 'wǒ huì shuō yìdiǎnr Zhōngwén': '我会说一点儿中文' } },
};
E.tipsReplace = E.tipsReplace || {};
for (const L of plan) {
  const id = `0-0-${L.n - 1}`, s = SYN[id];
  if (!s) { E.tipsReplace[id] = null; continue; }
  const [fr, tgt, ro, lit] = L.phrases[s.phrase];
  E.tipsReplace[id] = { title: s.title, example: `${fr} — ${tgt}`, body: s.body, exampleRo: ro, lit: pairs(lit).map(x => x[0]).join(' · ') };
  TS[id] = s.say;
}
write('tools/extra/zh.json', E); write('tools/phrase_fix/zh.json', P); write('tools/tips_fix/zh.json', TF); write('tools/tips_say/zh.json', TS);
console.log('module 1 installé :', plan.length, 'leçons,', Object.keys(E.scripts).length, 'scripts, synthèses après les leçons 5, 10, 15, 20');
