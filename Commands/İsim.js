
const names = require("../schemas/isimler");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require("../config.json");
module.exports = {
    "code": "isim",

 //CODER BY KRON1K.   
    async run (client, message, args) {
//CODER BY KRON1K.
        const embed = new MessageEmbed()
        .setAuthor({ name: message.member.displayName, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
        .setColor('#010000')
        .setFooter({ text: "Developed by kronik", iconURL: message.author.displayAvatarURL({ dynamic: true }) })

     if (!message.member.permissions.has(8) && !config.roller.Register.some((x) => message.member.roller.cache.get(x))) return message.reply({ embeds: [embed.setDescription("Yeterli yetkilere sahip değilsiniz.")] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 10000));

     let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
     if (!member) return message.reply({ embeds: [embed.setDescription("Geçerli bir üye belirtmelisiniz.\n\n\> .isim @kronik/ID Berkay 25")] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 10000));

    const isim = args[1].charAt(0).replace("i", "İ").toLocaleUpperCase() + args[1].slice(1).toLocaleLowerCase();
    const age = args[2];
    var name;
    if (config.Modes.Name == true) {
    if (!isim) return message.reply({ embeds: [embed.setDescription("Geçerli bir isim belirtmelisiniz.\n\n\> .isim @kronik/ID Berkay 25")] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 10000));
    if (!age) return message.reply({ embeds: [embed.setDescription("Geçerli bir yaş belirtmelisiniz.\n\n\> .isim @kronik/ID Berkay 25")] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 10000));
    name = `${config.Other.NamePrefix ? config.Other.NamePrefix : ""} ${isim} ${config.Other.NameSymbol ? config.Other.NameSymbol : "'"} ${age}`;
} else {
    let isim = args.slice(1).join(" ")
    if (!isim) return message.reply({ embeds: [embed.setDescription("Geçerli bir isim belirtmelisiniz.\n\n\> .isim @kronik/ID Berkay")] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 10000));
    name = isim;
}
const data = await names.findOne({ guildID: message.guild.id, userID: member.user.id });

//CODER BY KRON1K.
member.setNickname(name).catch((x) => console.error(x));
message.reply({ embeds: [embed.setDescription(`${member} isimli üyenin ismi \`${name}\` olarak değiştirildi.\n\n${data ? `Kullanıcının ${data.isimler.length} tane kayıt geçmişi bulundu.` : ""}\n${data ? `${data.isimler.splice(0, 5).map((x, i) => `\`${x.name}\` (${x.rol}) (<@${x.yetkili}>)`).join("\n")}` : ""}`)] }).catch((error) => console.log(error)).then((x) => setTimeout(() => { x.delete(); }, 15000));
await names.findOneAndUpdate({ guildID: message.guild.id, userID: member.user.id }, { $push: { isimler: { name: name, yetkili: message.author.id,  rol: "İsim Değiştirme", date: Date.now() } } }, { upsert: true });

}};
  