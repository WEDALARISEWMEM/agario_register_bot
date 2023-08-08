const beko = require  ('../config.json');
const kronik = require ('../settings.json');
module.exports = {
  name: 'messageCreate',
  execute(message, client) {
    // Yeniden başlatma komutunu dinleyecek olan kullanıcı ID'si
    const adminUserID = beko.roller.owner;
//CODER BY KRON1K.
    // Yeniden başlatma komutunu algılamak için gereken prefix (örneğin: !)
    const prefix = kronik.prefix;
//CODER BY KRON1K.
    // Kullanıcı mesajı "restart" komutunu gönderdiyse ve yetkili kullanıcı ise botu yeniden başlat
    if (message.author.id === adminUserID && message.content.toLowerCase() === `${prefix}restart`) {
      message.channel.send('Bot yeniden başlatılıyor...').then(() => {
        process.exit();
      });
    }
  },
};
//CODER BY KRON1K.