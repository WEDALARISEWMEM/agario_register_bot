const config = require("../config.json");
//CODER BY KRON1K.
exports.execute = async (member) => {
  const channel = member.guild.kanallar.cache.get(config.kanallar.Register);
  if (!channel) return; // Kanal tanımlı değilse işlem yapmayalım.
//CODER BY KRON1K.
  const welcomeMessage = `:tada: Sunucumuza hoş geldin, ${member}! Seninle birlikte sunucumuz **${member.guild.memberCount}** üyeye ulaştı.\n\n <#1121370674519343164>  odalarda teyit olduktan sonra isim yaş ve nick birde <#1121369961139548221> kanalına agario ekran görüntüsü atarak sesli odalardan birine katılarak kayıt olabilirsiniz. \n\n klanımızın kuralları ${config.kanallar.kurallar ? `<#${config.kanallar.kurallar}>` : "#kurallar"} isimli kanalda belirtilmiştir.\n\n${config.roller.Register.map((x) => `<@&${x}>`).join(", ")} rollerindeki yetkililer seninle ilgilenecektir. İyi eğlenceler! :tada::tada::tada:`;
//CODER BY KRON1K.
  try {
    await channel.send(welcomeMessage);
  } catch (error) {
    console.log("Hata: Sunucu hoş geldin mesajı gönderilemedi.");
  }
//CODER BY KRON1K.
  member.roller.add(config.roller.kayıtsız).catch((error) => console.log("Hata: Üyeye rol verilemedi.", error));
  member.setNickname(`${config.Other.NamePrefix ? config.Other.NamePrefix : ""} İsim ${config.Other.NameSymbol ? config.Other.NameSymbol : "'"} Yaş`).catch((error) => console.log("Hata: Üyenin ismi değiştirilemedi.", error));
};
//CODER BY KRON1K.
exports.conf = {
  event: "guildMemberAdd"
};
