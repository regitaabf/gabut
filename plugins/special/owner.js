exports.run = {
   usage: ['owner'],
   category: 'special',
   async: async (m, {
      client
   }) => {
      client.sendContact(m.chat, [{
         name: 'Contact Support',
         number: global.owner,
      }], m, {
         org: 'Hi, im a Yae Miko`s Owner',
         website: 'https://s.id/rwdev',
         email: 'timzzdev@gmail.com'
      })
   },
   error: false,
   cache: true,
}