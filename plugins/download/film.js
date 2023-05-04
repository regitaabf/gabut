exports.run = {
   usage: ['film'],
   //hidden: ['getapk'],
   use: 'query',
   category: 'downloader',
   async: async (m, {
      client,
      text,
      args,
      isPrefix,
      command
   }) => {
      try {
         if (command == 'film') {
            if (!text) return client.reply(m.chat, Func.example(isPrefix, command, 'batman 9'), m)
            client.sendReact(m.chat, '🕒', m.key)
            let json = await Api.film(text)
            //if (!json.status) return client.reply(m.chat, global.status.fail, m)
            let rows = []
            json.data.map(async (v, i) => {
               rows.push({
                  title: `${v.judul} — ${v.quality}`,
                  rowId: ``,
                  description: `[ ${v.type} | ${v.link} ]`
               })
            })
            client.sendList(m.chat, '', `Menampilkan hasil pencarian dari : “${text}”, klik untuk mendapatkan linknya`, '', 'Tap here!', [{
               rows
            }], m)
           }
      } catch (e) {
         console.log(e)
         return client.reply(m.chat, global.status.error, m)
      }
   },
   error: false,
   limit: true,
   restrict: true
}