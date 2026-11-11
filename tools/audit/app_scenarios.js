// Scénarios d'utilisation avec le faux plugin natif : on vérifie l'état après chaque action.
const { chromium } = require('playwright');
const installMock = require('./mock.js');
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 393, height: 852 } });
  const pg = await ctx.newPage();
  const errs = []; pg.on('pageerror', e => errs.push('PAGEERROR ' + e.message));
  await pg.addInitScript(installMock, { voices: require('./voices.js'), speed: 100000 });
  await pg.addInitScript(() => { try { localStorage.clear(); } catch (e) {} });
  await pg.goto('file://' + require('path').join(__dirname, '..', '..', 'www', 'index.html'));
  await pg.waitForTimeout(800);
  const R = []; const ok = (name, cond, extra) => { R.push(`${cond ? 'OK ' : 'ÉCHEC'} ${name}${extra ? ' — ' + extra : ''}`); };
  const S = () => pg.evaluate(() => ({ sess: document.getElementById('session').style.display, home: document.getElementById('home').style.display, name: document.getElementById('sessName').textContent, count: document.getElementById('sessCount').textContent, fr: document.getElementById('phraseFr').textContent, en: document.getElementById('phraseEn').textContent, paused: isPaused, segIndex, nseg: segments.length, prog: currentProgram, seq: window.__seq ? { i: window.__seq.i, n: window.__seq.items.length, active: window.__seq.active, paused: window.__seq.paused } : null, hasNative: !!nativeSeq, calls: window.__calls.slice(-6), elapsed: document.getElementById('timeElapsed').textContent, total: document.getElementById('timeTotal').textContent, toast: document.getElementById('toast').textContent, paywall: document.getElementById('paywall').classList.contains('show'), picker: document.getElementById('langPicker').classList.contains('show'), voicePicker: document.getElementById('voicePicker').classList.contains('show'), completed: state.completed.slice(), tip: document.getElementById('tipOverlay').classList.contains('show') }));
  // avance le faux natif de n éléments
  const adv = n => pg.evaluate(n => { const s = window.__seq; const L = Capacitor.Plugins.TextToSpeech; for (let k = 0; k < n && s.active && !s.paused; k++) { if (s.i >= s.items.length) { s.active = false; onNativeSeqEnd({ seq: s.seq }); break; } onNativeSeqProgress({ seq: s.seq, index: s.i }); s.i++; } }, n);
  const toEnd = () => pg.evaluate(() => { const s = window.__seq; while (s.active && !s.paused && s.i < s.items.length) { onNativeSeqProgress({ seq: s.seq, index: s.i }); s.i++; } if (s.active && !s.paused) { s.active = false; onNativeSeqEnd({ seq: s.seq }); } });

  // 1. premier lancement : choix de la langue
  let s = await S(); ok('1 premier lancement → écran de choix de langue', s.picker);
  await pg.click('.lang-item[data-code="en"]'); await sleep(300); s = await S();
  ok('1 anglais choisi → accueil', !s.picker && s.sess !== 'flex');
  // 2. intro → enchaîne sur la leçon 1
  await pg.click('.lesson-row.intro-row'); await sleep(200); s = await S();
  ok('2 intro démarre', s.sess === 'flex' && s.prog.type === 'intro' && s.hasNative, `${s.seq.n} éléments`);
  await pg.evaluate(() => { const s = window.__seq; const n = segments.length; for (let k = 0; k < n + 3; k++) { onNativeSeqProgress({ seq: s.seq, index: s.i }); s.i++; } }); s = await S();
  ok('2 après l\'intro → leçon 1 sans coupure', s.prog.type === 'lesson' && s.prog.li === 0 && /Leçon 1/.test(s.name), s.name + ' seg ' + s.segIndex);
  ok('2 intro marquée faite', await pg.evaluate(() => state.introDone === true));
  // 3. pause / reprise
  await pg.click('#playPauseBtn'); await sleep(50); s = await S(); ok('3 pause', s.paused && s.seq.paused && s.calls.includes('pause'));
  await pg.click('#playPauseBtn'); await sleep(50); s = await S(); ok('3 reprise', !s.paused && !s.seq.paused && s.calls.includes('resume'));
  // 4. +10 s / −10 s
  const before = s.segIndex; await pg.click('#skipFwdBtn'); await sleep(200); s = await S();
  ok('4 +10 s avance', s.segIndex > before && s.hasNative, `segment ${before} → ${s.segIndex}`);
  const b2 = s.segIndex; await pg.click('#skipBackBtn'); await sleep(200); s = await S();
  ok('4 −10 s recule', s.segIndex < b2, `segment ${b2} → ${s.segIndex}`);
  // 4b. +10 s pendant un long segment (texte de l'intro)
  await pg.evaluate(() => { closeSession(); startIntro(); }); await sleep(200);
  await pg.evaluate(() => { onNativeSeqProgress({ seq: nativeSeq.id, index: 4 }); }); s = await S(); const longSeg = s.segIndex;
  const longDur = await pg.evaluate(() => segments[segIndex].estMs);
  await pg.click('#skipFwdBtn'); await sleep(200); s = await S();
  ok('4b +10 s pendant un long passage (' + Math.round(longDur / 1000) + ' s) avance au passage suivant', s.segIndex > longSeg && await pg.evaluate(() => segments[segIndex].type === 'speak'), `segment ${longSeg} → ${s.segIndex}`);
  await pg.evaluate(() => { segStartedAt = Date.now() - 9000; }); const cur = s.segIndex; await pg.click('#skipBackBtn'); await sleep(200); s = await S();
  ok('4c −10 s au milieu d\'une phrase → on réécoute cette phrase', s.segIndex === cur, `segment ${cur} → ${s.segIndex}`);
  await pg.click('#skipBackBtn'); await sleep(200); s = await S();
  ok('4d −10 s en début de phrase → passage précédent (parlé)', s.segIndex < cur && await pg.evaluate(() => segments[segIndex].type === 'speak'), `segment ${cur} → ${s.segIndex}`);
  // 5. suivant / précédent
  await pg.evaluate(() => { closeSession(); startLesson(0, 2); }); await sleep(200);
  await pg.click('#nextBtn'); await sleep(200); s = await S(); ok('5 suivant depuis la leçon 3 → point de grammaire', s.prog.type === 'tip' && s.prog.li === 2, JSON.stringify(s.prog));
  await pg.click('#nextBtn'); await sleep(200); s = await S(); ok('5 suivant → leçon 4', s.prog.type === 'lesson' && s.prog.li === 3, JSON.stringify(s.prog));
  await pg.click('#prevBtn'); await sleep(200); s = await S(); ok('5 précédent → point de grammaire', s.prog.type === 'tip' && s.prog.li === 2, JSON.stringify(s.prog));
  // 6. point de grammaire seul jusqu'à la fin
  await toEnd(); await sleep(200); s = await S(); ok('6 fin du point de grammaire → retour accueil', s.sess === 'none' && /grammaire terminé/.test(s.toast) && s.completed.some(k => /tip-0-2/.test(k)), s.toast);
  // 7. évaluation seule
  await pg.evaluate(() => startEval(0, 4)); await sleep(200); s = await S(); ok('7 évaluation démarre', s.prog.type === 'eval' && s.nseg === 126, `${s.nseg} segments`);
  await toEnd(); await sleep(200); s = await S(); ok('7 fin de l\'évaluation → accueil', s.sess === 'none' && s.completed.some(k => /eval-0-4/.test(k)), s.toast);
  // 8. retour pendant une leçon : arrêt net
  await pg.evaluate(() => startLesson(0, 5)); await sleep(200); await adv(10); await pg.click('#backBtn'); await sleep(200); s = await S();
  ok('8 retour → accueil et natif arrêté', s.sess === 'none' && !s.hasNative && s.seq.active === false, s.calls.join(','));
  const lateOk = await pg.evaluate(() => { const before = document.getElementById('sessName').textContent; onNativeSeqProgress({ seq: window.__seq.seq, index: 20 }); onNativeSeqEnd({ seq: window.__seq.seq }); return document.getElementById('session').style.display === 'none' && before === document.getElementById('sessName').textContent; });
  ok('8 événements tardifs ignorés', lateOk);
  // 9. enchaînement gratuit : leçons 9, 10 puis écran d'achat
  await pg.evaluate(() => startLesson(0, 8)); await sleep(200); s = await S();
  const progs = await pg.evaluate(() => nativeSeq.programs.map(p => p.prog.type[0] + (p.prog.li)));
  ok('9 chaîne gratuite = leçons 9, 10 + évaluation 2, puis arrêt', JSON.stringify(progs) === '["l8","l9","e9"]', JSON.stringify(progs));
  await toEnd(); await sleep(300); s = await S();
  ok('9 fin des leçons gratuites → écran d\'achat', s.paywall && s.sess === 'none' && s.completed.includes('lv1-m1-l8') && s.completed.includes('lv1-m1-l9'));
  const lastSpoken = await pg.evaluate(() => { const segs = buildLessonSegments(0, 9).filter(x => x.type === 'speak' && x.label === 'Leçon terminée'); return segs.map(x => x.text).join(' | '); });
  R.push('   (info) dernière phrase de la leçon 10 gratuite : ' + lastSpoken);
  await pg.click('#closePaywallBtn');
  // 10. accès complet : fin de module
  await pg.evaluate(() => { access.en = true; saveAccess(access); renderHome(); startLesson(0, 18); }); await sleep(200);
  const progs2 = await pg.evaluate(() => nativeSeq.programs.slice(0, 6).map(p => `${p.prog.lv}.${p.prog.mi}.${p.prog.type[0]}${p.prog.li}`));
  ok('10 chaîne payante : leçon 19, 20, évaluation finale, puis module 2', JSON.stringify(progs2) === '["0.0.l18","0.0.l19","0.0.e19","0.1.l0","0.1.l1","0.1.l2"]', JSON.stringify(progs2));
  const ann = await pg.evaluate(() => nativeSeq.programs[3].segs[0].text); ok('10 changement de module annoncé à voix haute', /module suivant/.test(ann), ann);
  await pg.evaluate(() => { const s = window.__seq; for (let k = 0; k < s.items.length && nativeSeq; k++) { onNativeSeqProgress({ seq: s.seq, index: k }); if (nativeSeq.curP >= 4) break; } }); s = await S();
  ok('10 passage au module 2 : titre et progression à jour', /Leçon 2/.test(s.name) && s.completed.includes('lv1-m1-l19') && s.completed.some(k => /eval-0-19/.test(k)), s.name);
  // fin de niveau → niveau suivant, et vraie fin du parcours
  await pg.evaluate(() => { closeSession(); switchLevel(0); currentModule = 2; startLesson(2, 19); }); await sleep(200);
  const lvl = await pg.evaluate(() => nativeSeq.programs.slice(0, 4).map(p => `${p.prog.lv}.${p.prog.mi}.${p.prog.type[0]}${p.prog.li}`));
  ok('10 fin du niveau 1 → niveau 2 enchaîné', JSON.stringify(lvl) === '["0.2.l19","0.2.e19","1.0.l0","1.0.l1"]', JSON.stringify(lvl));
  await pg.evaluate(() => { closeSession(); switchLevel(2); startLesson(2, 18); }); await sleep(200);
  const endP = await pg.evaluate(() => ({ n: nativeSeq.programs.map(p => p.prog.type[0] + p.prog.li), last: nativeSeq.programs[nativeSeq.programs.length - 1].segs.filter(x => x.type === 'speak').slice(-1)[0].text }));
  ok('10 toute fin : dernière évaluation puis mot de la fin', JSON.stringify(endP.n) === '["l18","l19","e19"]' && /bout de toutes les leçons/.test(endP.last), JSON.stringify(endP));
  await toEnd(); await sleep(300); s = await S(); ok('10 fin du parcours → accueil + message', s.sess === 'none' && /toutes les leçons/.test(s.toast), s.toast);
  await pg.evaluate(() => { switchLevel(0); });

  // 11. changement de langue pendant la lecture
  await pg.evaluate(() => startLesson(1, 0)); await sleep(200); await adv(5);
  await pg.evaluate(async () => { await setLanguage('ja'); }); await sleep(300); s = await S();
  ok('11 changement de langue en pleine leçon → arrêt propre', s.sess === 'none' && !s.hasNative && s.seq.active === false);
  // 12. langue sans voix : intro puis leçon
  await pg.evaluate(async () => { window.__voices = [{ lang: 'fr-FR', name: 'Thomas', voiceURI: 'com.apple.voice.compact.fr-FR.Thomas' }]; await setLanguage('fa'); }); await sleep(400); s = await S();
  ok('12 persan sans voix → aide ouverte', s.voicePicker && await pg.evaluate(() => tgtVoiceMissing && document.getElementById('noVoiceBanner').style.display === 'block'));
  R.push('   (info) bandeau : ' + await pg.evaluate(() => document.getElementById('noVoiceBanner').textContent));
  await pg.evaluate(() => closeVoicePicker()); await pg.click('.lesson-row.intro-row'); await sleep(200);
  const chainFa = await pg.evaluate(() => nativeSeq.programs.map(p => p.prog.type + (p.prog.li ?? '')));
  ok('12 intro sans voix : ne doit PAS enchaîner sur des leçons muettes', chainFa.length === 1, JSON.stringify(chainFa));
  await toEnd(); await sleep(400); s = await S();
  ok('12 fin de l\'intro sans voix → retour accueil + aide pour installer la voix', s.sess === 'none' && s.voicePicker && s.completed.length === 0, `prog=${JSON.stringify(s.prog)} sess=${s.sess} aide=${s.voicePicker}`);
  await pg.evaluate(() => closeVoicePicker());
  await pg.evaluate(() => { startLesson(0, 0); }); await sleep(300); s = await S();
  ok('12 leçon lancée sans voix → refusée, aide affichée', s.sess === 'none' && s.voicePicker);
  await pg.evaluate(() => closeVoicePicker());
  // 13. appel téléphonique pendant une leçon
  await pg.evaluate(async () => { window.__voices = null; await setLanguage('en'); }); await sleep(300);
  await pg.evaluate(() => startLesson(0, 1)); await sleep(200); await adv(6);
  await pg.evaluate(() => window.__interrupt(true)); await sleep(50); s = await S();
  ok('13 appel entrant → leçon en pause (icône lecture)', s.paused && await pg.evaluate(() => /M8 5v14l11-7z/.test(document.getElementById('playIcon').innerHTML)));
  await pg.evaluate(() => window.__interrupt(false)); await sleep(50); s = await S();
  ok('13 fin d\'appel → reprise automatique', !s.paused && await pg.evaluate(() => /rect/.test(document.getElementById('playIcon').innerHTML)));
  // 14. la leçon se termine pendant que la page dort (événements perdus) → resynchronisation au réveil
  await pg.evaluate(() => { closeSession(); delete access.en; saveAccess(access); renderHome(); startLesson(0, 9); }); await sleep(200);
  await pg.evaluate(() => { window.__dropEvents = true; const s = window.__seq; s.i = s.items.length; s.active = false; s.ended = true; });
  s = await S(); ok('14 avant réveil : la page croit encore que la leçon joue', s.sess === 'flex' && s.hasNative);
  await pg.evaluate(async () => { await syncNativeSequence(); window.__dropEvents = false; }); await sleep(300); s = await S();
  ok('14 au réveil : leçon marquée terminée + écran d\'achat', s.sess === 'none' && s.paywall && s.completed.includes('lv1-m1-l9'), `sess=${s.sess} paywall=${s.paywall}`);
  await pg.evaluate(() => closePaywall());
  // 15. phrase de fin
  const ends = await pg.evaluate(() => { const last = (mi, li) => buildLessonSegments(mi, li).filter(x => x.type === 'speak' && x.label === 'Leçon terminée').map(x => x.text); delete access.en; const a = { free5: last(0, 2), free10: last(0, 9) }; access.en = true; a.paid10 = last(0, 9); a.paid20 = last(0, 19); delete access.en; return a; });
  ok('15 leçon suivie d\'une autre : « on va passer à la leçon suivante »', /leçon suivante/.test(ends.free5.join(' ')) && ends.free5.length === 1);
  ok('15 dernière leçon gratuite suivie d\'une évaluation : pas de « leçon suivante »', !/leçon suivante/.test(ends.free10.join(' ')), ends.free10.join(' | '));
  const freeEnd = await pg.evaluate(async () => { delete access.en; startLesson(0, 9); await new Promise(z => setTimeout(z, 150)); const last = nativeSeq.programs[nativeSeq.programs.length - 1]; const t = last.segs.filter(x => x.type === 'speak').slice(-1)[0].text; closeSession(); return t; });
  ok('15 fin des leçons gratuites annoncée après l\'évaluation', /leçons gratuites/.test(freeEnd), freeEnd);
  ok('15 leçon 20 avec accès : pas de mot de fin (le module suivant enchaîne)', !/bout de toutes|gratuites/.test(ends.paid20.join(' ')), ends.paid20.join(' | '));
  // 16. Chinois : évaluations mixtes et séries dans l'enchaînement
  await pg.evaluate(async () => { await setLanguage('zh'); }); await sleep(300);
  const zh = await pg.evaluate(async () => { startLesson(0, 4); await new Promise(z => setTimeout(z, 150)); const r = nativeSeq.programs.map(p => p.prog.type[0] + p.prog.li); const ev = nativeSeq.programs[1].segs; const words = ev.filter(x => /vocabulaire/.test(x.label) && x.lang === 'fr').length; const ser = nativeSeq.programs[3]; closeSession(); return { r, words, serType: ser.prog.type, serLen: ser.segs.length }; });
  ok('16 chinois : leçon 5 → évaluation (avec des mots) → leçon 6 → série', JSON.stringify(zh.r.slice(0, 4)) === '["l4","e4","l5","s5"]' && zh.words >= 10 && zh.serType === 'series', JSON.stringify(zh));
  console.log(R.join('\n')); console.log('Erreurs JS :', errs.length ? errs : 'aucune');
  await b.close();
})();
