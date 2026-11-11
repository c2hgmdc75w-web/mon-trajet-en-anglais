// Construit TOUS les programmes (leçons, points de grammaire, évaluations, intro) des 22 langues
// dans la vraie page, et vérifie chaque segment.
const { chromium } = require('playwright');
const installMock = require('./mock.js');
(async () => {
  const b = await chromium.launch(); const pg = await b.newPage();
  const errs = []; pg.on('pageerror', e => errs.push('PAGEERROR ' + e.message)); pg.on('console', m => { if (m.type() === 'error' && !/ERR_TUNNEL|net::/.test(m.text())) errs.push('CONSOLE ' + m.text()); });
  await pg.addInitScript(installMock, { voices: require('./voices.js') });
  await pg.goto('file://' + require('path').join(__dirname, '..', '..', 'www', 'index.html'));
  await pg.waitForTimeout(800);
  const res = await pg.evaluate(async () => {
    const NONLATIN = { ar:/[؀-ۿ]/, fa:/[؀-ۿ]/, he:/[֐-׿]/, hi:/[ऀ-ॿ]/, bn:/[ঀ-৿]/, ta:/[஀-௿]/, th:/[฀-๿]/, ja:/[぀-ヿ一-鿿]/, zh:/[一-鿿]/, yue:/[一-鿿]/, ko:/[가-힯ᄀ-ᇿ]/, ru:/[Ѐ-ӿ]/ };
    const ANY = /[Ѐ-ӿ֐-ۿऀ-෿฀-๿぀-ヿ一-鿿가-힯]/;
    const out = {};
    for (const code of LANG_ORDER) {
      const r = out[code] = { problems: [], programs: 0, segs: 0, lessonMin: [], tipSec: [], evalMin: [], dom: [] };
      const P = (m) => { if (r.problems.length < 40) r.problems.push(m); };
      const ok = await setLanguage(code);
      if (!ok) { P('setLanguage a échoué'); continue; }
      await new Promise(z => setTimeout(z, 30));
      const check = (segs, where) => {
        r.programs++; r.segs += segs.length;
        if (!segs.length) P(where + ' : aucun segment');
        let total = 0;
        segs.forEach((s, i) => {
          const w = `${where}[${i}]`;
          for (const k of ['label', 'frDisplay', 'enDisplay']) if (typeof s[k] !== 'string' || /undefined|NaN|\[object|null/.test(s[k].replace(/nulle?s?\b|nulla/gi, ''))) P(`${w} ${k} = ${JSON.stringify(s[k])}`);
          if (!s.ringColor || !s.ringIcon || !ICONS[s.ringIcon]) P(`${w} icône/couleur : ${s.ringIcon}`);
          if (s.type === 'speak') {
            if (typeof s.text !== 'string' || !s.text.trim()) P(`${w} texte vide`);
            else {
              if (/undefined|NaN|\[object/.test(s.text)) P(`${w} texte : ${s.text.slice(0, 80)}`);
              if (/<[a-z\/][^>]*>/i.test(s.text)) P(`${w} balise lue : ${s.text.slice(0, 80)}`);
              if (s.lang === 'fr' && ANY.test(s.text)) P(`${w} écriture étrangère lue par la voix française : ${s.text.slice(0, 80)}`);
              if (s.lang === 'tgt' && NONLATIN[code] && !NONLATIN[code].test(s.text)) P(`${w} voix native sans écriture native : ${s.text.slice(0, 80)}`);
              if (s.lang === 'fr' && !/[A-Za-zÀ-ÿ0-9]/.test(s.text)) P(`${w} texte français sans lettre : ${JSON.stringify(s.text)}`);
            }
            if (s.lang !== 'fr' && s.lang !== 'tgt') P(`${w} lang = ${s.lang}`);
            if (!(s.rate > 0 && s.rate <= 1.5)) P(`${w} rate = ${s.rate}`);
            if (!(s.estMs > 0) || !isFinite(s.estMs)) P(`${w} estMs = ${s.estMs}`);
            total += s.estMs;
          } else if (s.type === 'wait') {
            if (!(s.ms >= 0) || !isFinite(s.ms)) P(`${w} ms = ${s.ms}`);
            if (s.ms > 30000) P(`${w} silence de ${s.ms} ms`);
            total += s.ms;
          } else P(`${w} type = ${s.type}`);
        });
        return total;
      };
      check(buildIntroSegments(), 'intro');
      for (let lv = 0; lv < LEVELS.length; lv++) {
        switchLevel(lv);
        if (currentLevel !== lv) P('switchLevel ' + lv);
        for (let mi = 0; mi < MODULES.length; mi++) {
          currentModule = mi; renderHome();
          const txt = document.getElementById('home').innerText;
          if (/undefined|NaN|\[object|null/.test(txt)) r.dom.push(`accueil niv${lv} mod${mi} : ${(txt.match(/.{0,30}(undefined|NaN|\[object|null).{0,30}/) || [''])[0]}`);
          const rows = document.querySelectorAll('#lessonList .lesson-row').length;
          const expectRows = MODULES[mi].lessons.filter(l => l.tip).length + 20 + Object.keys(EVAL_NUMBERS).filter(k => k.startsWith(mi + '-')).length + (lv === 0 && mi === 0 ? 1 : 0);
          if (rows !== expectRows) r.dom.push(`accueil niv${lv} mod${mi} : ${rows} lignes au lieu de ${expectRows}`);
          for (let li = 0; li < MODULES[mi].lessonsCount; li++) {
            const where = `L${lv + 1}M${mi + 1}l${li + 1}`;
            let segs; try { segs = buildLessonSegments(mi, li); } catch (e) { P(where + ' EXCEPTION ' + e.message); continue; }
            r.lessonMin.push(check(segs, where) / 60000);
            const lesson = MODULES[mi].lessons[li];
            if (lesson.tip) { try { r.tipSec.push(check(buildTipSegments(lesson.tip, TIP_NUMBERS[mi + '-' + li] || ''), where + '.tip') / 1000); } catch (e) { P(where + '.tip EXCEPTION ' + e.message); } if (!TIP_NUMBERS[mi + '-' + li]) P(where + ' numéro de point de grammaire manquant'); }
            const ev = EVAL_NUMBERS[mi + '-' + li];
            if (ev) { try { r.evalMin.push(check(buildEvalSegments(mi, li, ev.isFinal, ev.isFinal ? 'Évaluation finale' : 'Évaluation ' + ev.num), where + '.eval') / 60000); } catch (e) { P(where + '.eval EXCEPTION ' + e.message); } }
          }
        }
      }
      // textes d'interface propres à la langue
      r.ui = { tagline: document.getElementById('tagline').textContent, langBtn: document.getElementById('langBtn').textContent, word: document.getElementById('wordmarkLang').textContent };
      await openPaywall(); r.ui.paywall = document.getElementById('paywallTitle').textContent + ' | ' + document.getElementById('buyBtn').textContent; closePaywall();
      const st = a => a.length ? { min: Math.min(...a).toFixed(1), moy: (a.reduce((x, y) => x + y, 0) / a.length).toFixed(1), max: Math.max(...a).toFixed(1) } : null;
      r.lessonMin = st(r.lessonMin); r.tipSec = st(r.tipSec); r.evalMin = st(r.evalMin);
    }
    return out;
  });
  let bad = 0;
  for (const [c, r] of Object.entries(res)) {
    const n = r.problems.length + r.dom.length; bad += n;
    console.log(`${c.padEnd(5)} programmes ${r.programs} segments ${r.segs} | leçon min ${JSON.stringify(r.lessonMin)} | tip s ${JSON.stringify(r.tipSec)} | éval min ${JSON.stringify(r.evalMin)} | problèmes ${n}`);
    r.problems.concat(r.dom).slice(0, 12).forEach(p => console.log('     ! ' + p));
  }
  console.log('\nTextes d\'interface :'); for (const [c, r] of Object.entries(res)) console.log(c.padEnd(5), JSON.stringify(r.ui));
  console.log('\nErreurs JS :', errs.length ? errs.slice(0, 10) : 'aucune'); console.log('TOTAL problèmes', bad);
  await b.close();
})();
