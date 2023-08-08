const isimler = require("../schemas/isimler");
const { MessageActionRow, MessageButton } = require("discord.js");
const config = require("../config.json");
//CODER BY KRON1K.
module.exports = {
  code: "k",
  async run(client, message, args) {
    const buttons = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setCustomId("erkek")
          .setLabel("erkek")
          .setStyle("PRIMARY")
      )//CODER BY KRON1K.
      .addComponents(
        new MessageButton()
          .setCustomId("disabled")
          .setLabel("Developed by Kronik.")
          .setStyle("SECONDARY")
          .setDisabled(true)
      )//CODER BY KRON1K.
      .addComponents(
        new MessageButton()
          .setCustomId("kadın")
          .setLabel("Bayan")
          .setStyle("SUCCESS")
      )//CODER BY KRON1K.
      .addComponents(
        new MessageButton()
          .setCustomId("iptal")
          .setLabel("İşlemi İptal Et")
          .setStyle("DANGER")
      );
//CODER BY KRON1K.
    if (!message.member.permissions.has("ADMINISTRATOR") && !config.roller.Register.some((x) => message.member.roles.cache.get(x))) { // HATA: member.roller.cache -> member.roles.cache
      return message.reply("Yeterli yetkilere sahip değilsiniz.").then((x) => setTimeout(() => x.delete(), 10000));
    }
//CODER BY KRON1K.
    let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
    if (!member) {
      return message.reply("Geçerli bir üye belirtmelisiniz.\n\n\> .k **@etiket** Berkay 25 kronik").then((x) => setTimeout(() => x.delete(), 10000));
    }
//CODER BY KRON1K.
    const data = await isimler.findOne({ guildID: message.guild.id, userID: member.user.id });
//CODER BY KRON1K.
    const [name, age, nickname] = args.slice(1);
//CODER BY KRON1K.
    if (!name || !age || !nickname) {
      return message.reply("Geçerli bir isim, yaş ve nickname belirtmelisiniz.\n\n\> .k **@etiket** Berkay 25 kronik").then((x) => setTimeout(() => x.delete(), 10000));
    }
//CODER BY KRON1K.
    let finalNickname = `${config.Other.NamePrefix ? config.Other.NamePrefix : ""} ${name} ${config.Other.NameSymbol ? config.Other.NameSymbol : "'"} ${age} / ${nickname}`;
//CODER BY KRON1K.
    message.channel.send(
      `${member} isimli oyuncunun ismi \`${finalNickname}\` olarak değiştirildi.\n\n${
        data ? `Kullanıcının ${data.isimler.length} tane kayıt geçmişi bulundu.` : ""
      }\n${data ? `${data.isimler.splice(0, 5).map((x, i) => `\`${x.name}\` (<@&${x.rol}>) (<@${x.yetkili}>)`).join("\n")}` : ""}`
    ).then((msg) => {
      setTimeout(() => msg.delete(), 15000);
//CODER BY KRON1K.
      const components = [buttons];
      if (config.Modes.ChatMessages) {
        message.guild.kanallar.cache
          .get(config.kanallar.Chat)
          .send(
            `Aramıza hoş geldin! ${member}. Sunucumuzun kuralları ${
              config.kanallar.kurallar ? `<#${config.kanallar.kurallar}>` : "#kurallar"
            } isimli kanallarda belirtilmiştir. Seninle birlikte sunucumuz **${message.guild.memberCount}** adet kişiye ulaştı!`,
            {
              components,
            }
          )//CODER BY KRON1K.
          .then((chatMsg) => setTimeout(() => chatMsg.delete(), 15000));
      } else {
        msg.edit({ components });
      }
    });
//CODER BY KRON1K.
    const filter = (i) => i.user.id === message.member.id;
    const collector = message.channel.createMessageComponentCollector({ filter, time: 30000 });
//CODER BY KRON1K.
    collector.on("collect", async (button) => {
      if (button.isButton()) {
        if (button.customId === "erkek") {
          member.setNickname(finalNickname).catch((x) => console.error(x));
          member.roles.set(config.roller.erkek).catch((x) => console.error(x)); // HATA: member.roller -> member.roles
          await isimler.findOneAndUpdate(
            { guildID: message.guild.id, userID: member.user.id },
            { $push: { isimler: { name: finalNickname, yetkili: message.author.id, rol: config.roller.erkek[0], date: Date.now() } } },
            { upsert: true }
          );//CODER BY KRON1K.
          message.reply(`${member} isimli üye **erkek** oyuncu olarak kayıt edildi!`).then((x) => setTimeout(() => x.delete(), 15000));
          if (config.Modes.ChatMessages) {
            message.guild.kanallar.cache
              .get(config.kanallar.Chat)
              .send(
                `Aramıza hoş geldin! ${member}. Sunucumuzun kuralları ${
                  config.kanallar.kurallar ? `<#${config.kanallar.kurallar}>` : "#kurallar"
                } isimli kanallarda belirtilmiştir. Seninle birlikte sunucumuz **${message.guild.memberCount}** adet kişiye ulaştı!`
              )
              .then((chatMsg) => setTimeout(() => chatMsg.delete(), 15000));
          }//CODER BY KRON1K.
        } else if (button.customId === "kadın") {
          member.setNickname(finalNickname).catch((x) => console.error(x));
          member.roles.set(config.roller.kadın).catch((x) => console.error(x));
          // KADIN BUTON
          await isimler.findOneAndUpdate(
            { guildID: message.guild.id, userID: member.user.id },
            { $push: { isimler: { name: finalNickname, yetkili: message.author.id, rol: config.roller.kadın[0], date: Date.now() } } },
            { upsert: true }
          );//CODER BY KRON1K.
          message.reply(`${member} isimli üye **Kadın** olarak kayıt edildi!`).then((x) => setTimeout(() => x.delete(), 15000));
          if (config.Modes.ChatMessages) {
            message.guild.kanallar.cache
              .get(config.kanallar.Chat)
              .send(
                `Aramıza hoş geldin! ${member}. Sunucumuzun kuralları ${
                  config.kanallar.kurallar ? `<#${config.kanallar.kurallar}>` : "#kurallar"
                } isimli kanallarda belirtilmiştir. Seninle birlikte sunucumuz **${message.guild.memberCount}** adet kişiye ulaştı`
              )//CODER BY KRON1K.
              .then((chatMsg) => setTimeout(() => chatMsg.delete(), 15000));
          }//CODER BY KRON1K.
        }//CODER BY KRON1K.
        button.message.delete().catch((e) => {
          console.error(e);
          const filter = (i) => i.user.id === message.member.id;
          const collector = message.channel.createMessageComponentCollector({ filter, time: 30000 });
      //CODER BY KRON1K.
          collector.on("collect", async (button) => {
            if (button.isButton()) {
              if (button.customId === "erkek") {
                member.setNickname(finalNickname).catch((x) => console.error(x));
                member.roles.set(config.roller.erkek).catch((x) => console.error(x));
      
                await isimler.findOneAndUpdate(
                  { guildID: message.guild.id, userID: member.user.id },
                  { $push: { isimler: { name: finalNickname, yetkili: message.author.id, rol: config.roller.erkek[0], date: Date.now() } } },
                  { upsert: true }
                );
      //CODER BY KRON1K.
                message.reply(`${member} isimli üye **erkek** oyuncu olarak kayıt edildi!`).then((x) => setTimeout(() => x.delete(), 15000));
                if (config.Modes.ChatMessages) {
                  message.guild.kanallar.cache
                    .get(config.kanallar.Chat)
                    .send(
                      `Aramıza hoş geldin! ${member}. Sunucumuzun kuralları ${
                        config.kanallar.kurallar ? `<#${config.kanallar.kurallar}>` : "#kurallar"
                      } isimli kanallarda belirtilmiştir. Seninle birlikte sunucumuz **${message.guild.memberCount}** adet kişiye ulaştı!`
                    )
                    .then((chatMsg) => setTimeout(() => chatMsg.delete(), 15000));
                }//CODER BY KRON1K.
              } else if (button.customId === "kadın") {
                member.setNickname(finalNickname).catch((x) => console.error(x));
                member.roles.set(config.roller.kadın).catch((x) => console.error(x));
      //CODER BY KRON1K.
                // KADIN BUTON
                await isimler.findOneAndUpdate(
                  { guildID: message.guild.id, userID: member.user.id },
                  { $push: { isimler: { name: finalNickname, yetkili: message.author.id, rol: config.roller.kadın[0], date: Date.now() } } },
                  { upsert: true }
                );//CODER BY KRON1K.
      //CODER BY KRON1K.
                message.reply(`${member} isimli üye **Kadın** olarak kayıt edildi!`).then((x) => setTimeout(() => x.delete(), 15000));
                if (config.Modes.ChatMessages) {
                  message.guild.kanallar.cache
                    .get(config.kanallar.Chat)
                    .send(
                      `Aramıza hoş geldin! ${member}. Sunucumuzun kuralları ${
                        config.kanallar.kurallar ? `<#${config.kanallar.kurallar}>` : "#kurallar"
                      } isimli kanallarda belirtilmiştir. Seninle birlikte sunucumuz **${message.guild.memberCount}** adet kişiye ulaştı`
                    )//CODER BY KRON1K.
                    .then((chatMsg) => setTimeout(() => chatMsg.delete(), 15000));
                }//CODER BY KRON1K.
              } else if (button.customId === "iptal") {
                // İPTAL BUTONU
                button.message.delete().catch((e) => {
                  console.error(e)
                });//CODER BY KRON1K.
                message.reply("İşlem iptal edildi.").then((x) => setTimeout(() => x.delete(), 5000));
              }}})})//CODER BY KRON1K.
    }}//CODER BY KRON1K.
    )    }}//CODER BY KRON1K.
            