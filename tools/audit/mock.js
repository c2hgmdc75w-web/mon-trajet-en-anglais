// Faux plugin natif (Capacitor) injecté dans la page pour les tests.
module.exports = function installMock(opts) {
  const L = {}; let timer = null;
  window.__calls = []; window.__seq = null; window.__speed = (opts && opts.speed) || 0;
  const voices = (opts && opts.voices) || [];
  const tts = {
    addListener(n, f) { L[n] = f; return Promise.resolve({ remove() {} }); },
    async getSupportedVoices() { return { voices: window.__voices || voices }; },
    async speak(o) { window.__calls.push('speak:' + o.lang + ':' + String(o.text).slice(0, 30)); },
    async stop() { window.__calls.push('stop'); clearTimeout(timer); if (window.__seq) window.__seq.active = false; },
    async playSequence({ items, seq, start }) {
      window.__calls.push('play ' + items.length);
      clearTimeout(timer);
      const st = window.__seq = { items, seq, i: start || 0, active: true, paused: false, ended: false };
      const step = () => {
        if (!st.active || st.paused) return;
        if (st.i >= items.length) { st.active = false; st.ended = true; if (!window.__dropEvents) L.seqEnd && L.seqEnd({ seq }); return; }
        if (!window.__dropEvents) L.seqProgress && L.seqProgress({ seq, index: st.i }); st.i++;
        timer = setTimeout(step, window.__speed);
      };
      st.step = step; timer = setTimeout(step, 0);
      return { seq };
    },
    async pauseSequence() { window.__calls.push('pause'); if (window.__seq) window.__seq.paused = true; },
    async resumeSequence() { window.__calls.push('resume'); if (window.__seq && window.__seq.paused) { window.__seq.paused = false; window.__seq.step(); } },
    async getSequenceState() { const s = window.__seq; return s ? { seq: s.seq, index: Math.max(0, s.i - 1), active: s.active, paused: s.paused, ended: s.ended } : { active: false }; }
  };
  // simulation d'un appel téléphonique
  window.__interrupt = (begin) => { const s = window.__seq; if (!s || !s.active) return; if (begin) { s.paused = true; L.seqPaused && L.seqPaused({ seq: s.seq }); } else { s.paused = false; L.seqResumed && L.seqResumed({ seq: s.seq }); }
  };
  window.Capacitor = { isNativePlatform: () => true, getPlatform: () => 'ios', Plugins: { TextToSpeech: tts } };
};
