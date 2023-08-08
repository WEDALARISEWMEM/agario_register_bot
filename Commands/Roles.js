const { MessageSelectMenu, MessageActionRow } = require("discord.js");
const config = require("../config.json");
//CODER BY KRON1K.
module.exports = {
  code: "rol",
//CODER BY KRON1K.
  async run(client, message, args) {
    if (!message.member.permissions.has(8) && !config.roller.Register.some((x) => message.member.roles.cache.has(x))) {
      return message.reply("Yeterli yetkilere sahip değilsiniz.").then((x) => setTimeout(() => { x.delete(); }, 10000)).catch((error) => console.log(error));
    }//CODER BY KRON1K.
//CODER BY KRON1K.
    let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first();
    if (!member) {
      return message.reply("Geçerli bir üye belirtmelisiniz.\n\n\> .rol @kronik/Berkay 25").then((x) => setTimeout(() => { x.delete(); }, 10000)).catch((error) => console.log(error));
    }
//CODER BY KRON1K.
    const menuOptions = [
      {
        label: "VIP Rolü ver",
        value: "vip",
        description: "vip rolü vermeye yaramaktadır.",
        emoji:"<:special:1133959599255474286>"
      },//CODER BY KRON1K.
      {
        label: "kayıt yetkilisi",
        value: "register",
        description: "kayıt yetkisi vermeye yaramaktadır.",
        emoji:"<:ayarlar:1133958743927828500>",
      },//CODER BY KRON1K.
      {
        label: "Kayıtsız rolü ver",
        value: "unregister",
        description: "kullanıcıyı kayıtsıza atmaya yaramaktadır.",
        emoji:"<:bekocan:1133960440142114896>"
      },//CODER BY KRON1K.
      {
        label: "agario",
        value: "agario",
        description: "Bu seçeneği seçerek kullanıcıya agario rolü verir.",
        emoji: "<:qxagar:1121493144672935977>",
      },//CODER BY KRON1K.
    ];

    const selectMenu = new MessageSelectMenu()
      .setCustomId("rol_select")
      .setPlaceholder("CODER BY KRON1K.")
      .addOptions(menuOptions);

    const row = new MessageActionRow()
      .addComponents(selectMenu);
//CODER BY KRON1K.
    message.channel.send({ content: `
${member} isimli kullanıcı için bir seçim menüsü açıldı! Bu menüde bu kullanıcıyı **kayıtsız**a atabilir, **kayıt yetkilisi** yapabilir, **VIP** yapabilir **Agar.io** rolü verebilirsiniz.

:no_entry_sign: Bu eylemlerden sadece minimum kayıt yetkilisi yapabilmektedir.
`, components: [row] }).then((x) => setTimeout(() => { x.delete(); }, 15000)).catch((error) => console.log(error));

    const filter = (i => i.user.id === message.member.id);
    const collector = message.channel.createMessageComponentCollector({ filter, time: 200000 });

    collector.on('collect', async (button) => {
      if (button.isSelectMenu() && button.customId === "rol_select") {
        const selectedValue = button.values[0];
//CODER BY KRON1K.
        switch (selectedValue) {
            case "vip":
                // VIP rolü verme işlemleri
                const vipRoleId = "1121381094667853845"; // config.json dosyasında VIP rolünün ID'sini buraya yazın.
                if (!vipRoleId) return; // Eğer ID girilmemişse bu seçeneği kullanamayız.
                
                if (member.roles.cache.has(vipRoleId)) {
                  member.roles.remove(vipRoleId).catch((x) => {});
                  button.reply({ content: `${member} adlı kullanıcıdan VIP rolü alındı!`, ephemeral: true }).then((x) => setTimeout(() => { x.delete(); }, 10000)).catch((error) => console.log(error));
                } else {
                  member.roles.add(vipRoleId).catch((x) => {});
                  button.reply({ content: `${member} adlı kullanıcıya VIP rolü verildi!`, ephemeral: true }).then((x) => setTimeout(() => { x.delete(); }, 10000)).catch((error) => console.log(error));
                }
                break;              
//CODER BY KRON1K.
                case "register":
                    // Kayıt yetkilisi rolü verme işlemleri
                    const registerRoleId = "1121376988461010984"; // Replace with the ID of the "kayıt yetkilisi" role from config.json
                    if (!registerRoleId) return; // Eğer ID girilmemişse bu seçeneği kullanamayız.
                  
                    if (member.roles.cache.has(registerRoleId)) {
                      member.roles.remove(registerRoleId).catch((x) => {});
                      button.reply({ content: `${member} adlı kullanıcıdan kayıt yetkilisi rolü alındı!`, ephemeral: true }).then((x) => setTimeout(() => { x.delete(); }, 10000)).catch((error) => console.log(error));
                    } else {
                      member.roles.add(registerRoleId).catch((x) => {});
                      button.reply({ content: `${member} adlı kullanıcıya kayıt yetkilisi rolü verildi!`, ephemeral: true }).then((x) => setTimeout(() => { x.delete(); }, 10000)).catch((error) => console.log(error));
                    }
                    break;
                  //CODER BY KRON1K.
                  case "unregister":
                    // Kayıtsız rolü verme işlemleri
                    const unregisterRoleId = "1121375748423430225"; // Replace with the ID of the "kayıtsız" role from config.json
                    if (!unregisterRoleId) return; // Eğer ID girilmemişse bu seçeneği kullanamayız.
                  
                    member.roles.set([unregisterRoleId]).catch((x) => {});
                    member.setNickname(`${config.Other.NamePrefix ? config.Other.NamePrefix : ""} İsim ${config.Other.NameSymbol ? config.Other.NameSymbol : "'"} Yaş / Nick`);
                    button.reply({ content: `${member} adlı kullanıcı kayıtsıza atıldı!`, ephemeral: true }).then((x) => setTimeout(() => { x.delete(); }, 10000)).catch((error) => console.log(error));
                    break;
//CODER BY KRON1K.
          case "agario":
            // agario rolü verme işlemleri
            const agarioRoleId = "1121376209612320799"; // config.json dosyasında id'si girilen agario rolünün ID'sini buraya yazın.
            if (!agarioRoleId) return; // Eğer ID girilmemişse bu seçeneği kullanamayız.
            if (member.roles.cache.has(agarioRoleId)) {
              member.roles.remove(agarioRoleId).catch((x) => { });
              button.reply({ content: `${member} adlı kullanıcıdan agario rolü alındı!`, ephemeral: true }).then((x) => setTimeout(() => { x.delete(); }, 10000)).catch((error) => console.log(error));
            } else {
              member.roles.add(agarioRoleId).catch((x) => { });
              button.reply({ content: `${member} adlı kullanıcıya agario rolü verildi!`, ephemeral: true }).then((x) => setTimeout(() => { x.delete(); }, 10000)).catch((error) => console.log(error));
            }
            break;
        }//CODER BY KRON1K.
//CODER BY KRON1K.
        collector.stop();
        button.message.delete().catch(e => { console.error(e) });
      }
    });
  }
};
//CODER BY KRON1K.