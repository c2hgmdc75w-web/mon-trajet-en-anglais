// Charge toutes les langues : { code: levels }
const fs = require('fs'), path = require('path');
const DIR = path.join(__dirname, '..', '..', 'www', 'data');
module.exports = function(){
  const out = {};
  for (const f of fs.readdirSync(DIR).filter(f => f.endsWith('.js')).sort()) {
    const code = f.replace('.js', '');
    const window = {};
    new Function('window', fs.readFileSync(path.join(DIR, f), 'utf8'))(window);
    out[code] = window.MT_DATA[code];
  }
  return out;
};
