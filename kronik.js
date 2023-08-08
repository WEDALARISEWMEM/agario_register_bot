const { Client, Collection, MessageEmbed } = require("discord.js");
const mongoose = require("mongoose");
const settings = require("./settings.json");
const config = require("./config.json");

const client = new Client({
  intents: [
    "GUILDS",
    "GUILD_MEMBERS",
    "GUILD_MESSAGES",
    // CODER BY KRON1K. TAMAMEN AGARİO KAYIT SUNUCULARI İÇİN YAPILMIŞ BİR BOTTUR VE ALTYAPIMI İLKER VE EREN ARKADAŞIMLA BARIŞTIĞIM İÇİN PUB YANİ HERKESE KULLANMASI İÇİN ATIYORUM
  ]
});
//CODER BY KRON1K.
mongoose.connect(settings.mongoURL, {
  //useCreateIndex: true, ELLEME
  //useFindAndModify: false, ELLEME
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//CODER BY KRON1K.
mongoose.connection.on("connected", () => {
  console.log("Database'ye bağlanıldı.");
});
//CODER BY KRON1K.
mongoose.connection.on("error", () => {
  console.error("Database'ye bağlanılamadı.");
});
//CODER BY KRON1K.
client.login(settings.token).catch((err) => {
  console.error("Bota bağlanılamadı.");
});
//CODER BY KRON1K.
client.commands = new Collection();
const { readdirSync } = require("fs");
const { join } = require("path");
//CODER BY KRON1K.
const commandFiles = readdirSync(join(__dirname, "Commands")).filter((file) =>
  file.endsWith(".js")
);
//CODER BY KRON1K.
for (const file of commandFiles) {
  const command = require(join(__dirname, "Commands", file));
  client.commands.set(command.code, command);
  console.log("[CODER BY KRON1K.] " + command.code + " adlı komut başarıyla yüklendi.");
}
const restartEvent = require('./Commands/restart.js');
client.on(restartEvent.name, (message) => restartEvent.execute(message, client));
//CODER BY KRON1K.
readdirSync("./Events")
  .filter((file) => file.endsWith(".js"))
  .forEach((file) => {
    const event = require(`./Events/${file}`);
    client.on(event.conf.event, event.execute);
    console.log(`[CODER BY KRON1K.] ${file.replace(".js", "")} adlı event başarıyla yüklendi.`);
  });
//CODER BY KRON1K.
client.once("ready", async () => {
  console.log("Bota giriş yapıldı.");
});
//CODER BY KRON1K.
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  const embed = new MessageEmbed();
  if (message.content.startsWith(settings.prefix)) {
    const args = message.content.slice(settings.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);
    if (!cmd) return;
    try {
      cmd.run(client, message, args, settings);
    } catch (error) {
      console.error(error);
    }
  }
});
//CODER BY KRON1K.