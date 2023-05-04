let fs = require('fs')
exports.run = {
   usage: ['tebakbendera', 'whatflag'],
   category: 'games',
   async: async (m, {
      client,
      isOwner,
      isPrefix
   }) => {     
   
      client.whatflag = client.whatflag ? client.whatflag : {}
      let id = m.chat,
      timeout2 = 120000,
      poin = 0
      if (id in client.whatflag) return client.reply(m.chat, 'Pertanyaan ini belum dijawab.', client.whatflag[id][0])
      let _brainout = await Func.fetchJson(`https://raw.githubusercontent.com/BochilTeam/database/master/games/tebakbendera2.json`)
      let json = _brainout[Math.floor(Math.random() * _brainout.length)]
      let teks = `*TEBAK BENDERA*\n\nApa nama bendera dari berikut ini ?.\n\n`
      teks += `Timeout : [ *${((timeout2 / 1000) / 60)} minutes* ]\n`
      teks += `Balas pesan ini untuk menjawab pertanyaan, ketik *${isPrefix}flagclue* untuk bantuan dan *${isPrefix}flagskip* untuk menghapus sesi.`
      client.whatflag[id] = [
         await client.sendMessageModify(m.chat, teks, m, {
               largeThumb: true,
               thumbnail: await Func.fetchBuffer(json.img),
               url: global.db.setting.link
            }),
         json, poin,
         setTimeout(() => {
            if (client.whatflag[id]) client.reply(m.chat, `*Waktunya habis!*\nJawabanya adalah : *${json.name}*`, client.whatflag[id][0])
            delete client.whatflag[id]
         }, timeout2)
      ]
   },
   group: true,
}