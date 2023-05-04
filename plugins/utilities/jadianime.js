exports.run = {
   usage: ['jadianime'],
  // hidden: ['alien', 'brick', 'bunny', 'caricature', 'clown', 'ink', 'latte', 'letter', 'pencil', 'puzzle', 'roses', 'sketch', 'splash', 'staco'],
   use: 'reply foto',
   category: 'utilities',
   async: async (m, {
      client,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (command == 'jadianime') {
            let q = m.quoted ? m.quoted : m
            let mime = (q.msg || q).mimetype || ''
            if (!/image\/(jpe?g|png)/.test(mime)) return client.reply(m.chat, Func.texted('bold', `Kirim gambar dengan caption atau reply ${isPrefix + command}`), m)
            let img = await q.download()
            if (!img) return client.reply(m.chat, Func.texted('bold', `Kirim gambar dengan caption atau reply ${isPrefix + command}`), m)
            client.sendReact(m.chat, '🕒', m.key)
               let image = require('../../uploadImage')
               let json = 'https://sh.xznsenpai.xyz/api/toanime?url=${image}'
            client.sendFile(m.chat, json, Func.filename('jpg'), `Anjai jadi Animek`, m)
     } 
   } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
     }
    }
   }