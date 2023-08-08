const Discord = require("discord.js");
const client = global.client;
const config = require("../config.json");
exports.execute = async (message) => {
if ([".tag", "!tag", "/tag","Tag","tag"].some((x) => message.content.startsWith(x))) {
message.channel.send(config.Other.Tag.map((x) => "`" + x + "`").join(", "))
} 
};
exports.conf = {
  event: "messageCreate"
};
//CODER BY KRON1K.