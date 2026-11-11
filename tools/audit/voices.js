module.exports = [
  ['fr-FR','Thomas','compact'],['fr-FR','Aurélie','premium'],['de-DE','Anna','compact'],['en-US','Samantha','compact'],['en-GB','Daniel','compact'],['ar-001','Majed','compact'],['ar-SA','Maged','compact'],
  ['es-ES','Mónica','compact'],['es-MX','Paulina','compact'],['it-IT','Alice','compact'],['ja-JP','Kyoko','compact'],['pt-BR','Luciana','compact'],['pt-PT','Joana','compact'],
  ['zh-CN','Tingting','compact'],['zh-TW','Meijia','compact'],['zh-HK','Sinji','compact'],['he-IL','Carmit','compact'],['hi-IN','Lekha','compact'],['th-TH','Kanya','compact'],
  ['bn-IN','Piya','compact'],['ru-RU','Milena','compact'],['id-ID','Damayanti','compact'],['vi-VN','Linh','compact'],['tr-TR','Yelda','compact'],['ta-IN','Vani','compact'],
  ['ko-KR','Yuna','compact'],['fa-IR','Dariush','compact'],['pl-PL','Zosia','compact']
].map(([lang, name, q]) => ({ lang, name, voiceURI: `com.apple.voice.${q}.${lang}.${name}` }));
