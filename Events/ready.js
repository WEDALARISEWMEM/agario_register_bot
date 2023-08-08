module.exports = {
  conf: {
    event: "ready"
  },
  execute: (client) => {
    console.log(`Bot aktif kronik botun adı: ${client.user.tag}!`);
    client.user.setPresence({
      activities: [{ name: "CODER BY KRON1K.", type: "STREAMING", url: "https://www.twitch.tv/bekocanxd" }],
      status: "online"
    });
  }
};
//CODER BY KRON1K.