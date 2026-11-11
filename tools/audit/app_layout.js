// Vérifie après correctif : contrôles toujours visibles, rien de coupé, sur plusieurs tailles d'écran.
const { chromium } = require('playwright');
const installMock = require('./mock.js');
(async () => {
  const b = await chromium.launch();
  for (const [w, h, name] of [[393, 852, 'iPhone 15/16'], [430, 932, 'iPhone Pro Max'], [375, 667, 'iPhone SE'], [320, 568, 'très petit'], [852, 393, 'paysage'], [820, 1180, 'iPad']]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
    const pg = await ctx.newPage();
    await pg.addInitScript(installMock, { voices: require('./voices.js') });
    await pg.goto('file://' + require('path').join(__dirname, '..', '..', 'www', 'index.html'));
    await pg.waitForTimeout(900);
    const res = await pg.evaluate(async (codes) => {
      const out = [];
      for (const code of codes) {
        await setLanguage(code); closeLangPicker();
        document.getElementById('home').style.display = 'none'; document.getElementById('session').style.display = 'flex'; hideTipCard();
        let n = 0, ctrlOut = 0, pageOver = 0, stageScroll = 0, maxScroll = 0, topCut = 0;
        for (let lv = 0; lv < 3; lv++) {
          switchLevel(lv);
          MODULES.forEach((m, mi) => m.lessons.forEach((l, li) => { $('sessName').textContent = `${m.name} · Leçon ${li + 1} · ${l.title}`; l.phrases.forEach(p => {
            setStage('Test 2 — à toi de répondre', 9, 10, p.fr, p.tgt, 'var(--speak)', 'repeat', true);
            const st = document.querySelector('.stage'); st.scrollTop = 0;
            const c = document.querySelector('.controls').getBoundingClientRect();
            n++; if (c.bottom > window.innerHeight + 0.5) ctrlOut++;
            if (document.documentElement.scrollHeight > window.innerHeight + 1) pageOver++;
            const sc = st.scrollHeight - st.clientHeight; if (sc > 1) { stageScroll++; maxScroll = Math.max(maxScroll, sc); }
            const first = st.querySelector('.ring-wrap'); const fr = first.getBoundingClientRect(), sr = st.getBoundingClientRect();
            if (getComputedStyle(first).display !== 'none' && fr.top < sr.top - 1) topCut++;
          }); }));
        }
        out.push(`${code}: contrôles hors écran ${ctrlOut}/${n}, page qui déborde ${pageOver}, zone centrale défilante ${stageScroll} (max ${Math.round(maxScroll)}px), haut coupé ${topCut}`);
      }
      return out;
    }, ['en', 'ja', 'ar', 'ta']);
    console.log(`== ${name} ${w}×${h} ==`); res.forEach(r => console.log('  ' + r));
    if (name === 'iPhone SE' || name === 'paysage' || name === 'iPhone 15/16') {
      await pg.evaluate(async () => { await setLanguage('ta'); closeLangPicker(); document.getElementById('home').style.display = 'none'; document.getElementById('session').style.display = 'flex'; switchLevel(2); const p = MODULES[0].lessons[3].phrases[2]; $('sessName').textContent = `${MODULES[0].name} · Leçon 4 · ${MODULES[0].lessons[3].title}`; setStage('À toi de répéter', 2, 10, p.fr, p.tgt, 'var(--speak)', 'repeat', true); updateScrubberLive(125000); });
      await pg.waitForTimeout(200); if (process.argv.includes('--shots')) await pg.screenshot({ path: `fix_${w}x${h}.png` });
    }
    await ctx.close();
  }
  await b.close();
})();
