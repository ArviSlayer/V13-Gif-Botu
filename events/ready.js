const { Client, MessageEmbed, User } = require("discord.js");
const { ppKanal, gifKanal, bannerKanal, sunucuId } = require("../ayarlar.json")
const axios = require("axios");
/**
 * 
 * @param {Client} client 
 */
module.exports = async (client) => {



  if (!client.guilds.cache.get(sunucuId)) return;

  setInterval(() => {

    let randomUser = client.users.cache.filter(a => !a.bot)
      .filter(a => a.avatarURL({ dynamic: true, size: 1024 })).random();

    axios.get(`https://discord.com/api/users/${randomUser.id}`, {
      headers: {
        Authorization: "Bot " + client.token,
      }
    }).then(res => {
      if (res.data.banner) {
        if (!client.channels.cache.get(bannerKanal)) { };
        if (res.data.banner.startsWith("a_")) {
          client.guilds?.cache?.get(sunucuId).channels?.cache?.get(bannerKanal)?.send({
            embeds: [new MessageEmbed().setTitle(randomUser.tag).setDescription(`[Yüklenmediyse Tıkla](https://cdn.discordapp.com/banners/${randomUser.id}/${res.data.banner}.gif?size=4096)`)
              .setImage(`https://cdn.discordapp.com/banners/${randomUser.id}/${res.data.banner}.gif?size=4096`)]
          })
        }
        else {
          client.guilds?.cache?.get(sunucuId).channels?.cache?.get(bannerKanal)?.send({
            embeds: [new MessageEmbed().setTitle(randomUser.tag).setDescription(`[Yüklenmediyse Tıkla](https://cdn.discordapp.com/banners/${randomUser.id}/${res.data.banner}.png?size=4096)`)
              .setImage(`https://cdn.discordapp.com/banners/${randomUser.id}/${res.data.banner}.png?size=4096`)]
          })
        }

      }
    })
    .catch(() => {})

    if (randomUser.avatarURL({ dynamic: true, size: 1024 }).split("?")[0].endsWith(".gif")) {

      if (!client.channels.cache.get(gifKanal)) return;
      client.guilds?.cache?.get(sunucuId).channels?.cache?.get(gifKanal)?.send({
        embeds: [new MessageEmbed().setTitle(randomUser.tag).setDescription(`[Yüklenmediyse Tıkla](${randomUser.avatarURL({ dynamic: true, size: 1024 })})`)
          .setImage(randomUser.avatarURL({ dynamic: true, size: 1024 }))]
      })
    }
    else {
      if (!client.channels.cache.get(ppKanal)) return;

      client.guilds?.cache?.get(sunucuId).channels?.cache?.get(ppKanal)?.send({
        embeds: [new MessageEmbed().setTitle(randomUser.tag).setDescription(`[Yüklenmediyse Tıkla](${randomUser.avatarURL({ dynamic: true, size: 1024 })})`)
          .setImage(randomUser.avatarURL({ dynamic: true, size: 1024 }))]
      })
    }
  }, 7 * 1000)
};

