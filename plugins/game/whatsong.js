let fs = require('fs')
exports.run = {
   usage: ['tebaklagu', 'whatsong'],
   category: 'games',
   async: async (m, {
      client,
      isOwner,
      isPrefix
   }) => {    
     
      client.tebaklagu = client.tebaklagu ? client.tebaklagu : {}
      let id = m.chat,
         timeout = 120000,
         poin = 0
      if (id in client.tebaklagu) return client.reply(m.chat, 'Pertanyaan ini belum dijawab.', client.tebaklagu[id][0])
      let _tebaklirik = await Func.fetchJson(`https://fatiharridho.github.io/tebaklagu.json`)
      let json = _tebaklirik[Math.floor(Math.random() * _tebaklirik.length)]
      let audio = await client.sendMessage(m.chat, {audio: await Func.fetchBuffer(json.link_song), mimetype:'audio/mpeg', ptt: true }, {quoted:m})
      let teks = `*TEBAK LAGU*\n\nApa judul lagu dari berikut ini ?\n\n`
      teks += `Timeout : [ *${((timeout / 1000) / 60)} minutes* ]\n`
      teks += `Balas pesan ini untuk menjawab pertanyaan, ketik *${isPrefix}songclue* untuk bantuan. dan *${isPrefix}songskip* untuk menghapus sesi `
      client.tebaklagu[id] = [
         await client.reply(m.chat, teks, audio),
         json, poin,
         setTimeout(() => {
            if (client.tebaklagu[id]) client.reply(m.chat, `*Waktunya habis!*\nJawabannya adalah : *${json.jawaban}*`, client.tebaklagu[id][0])
            delete client.tebaklagu[id]
         }, timeout)
      ]
   },
   group: true,
}