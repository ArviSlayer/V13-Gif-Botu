const { MessageEmbed } = require("discord.js");
module.exports = {
    name: "Ping",
    description: '> Gifty Ping Değerleri',
    options: [],
    run: async (client, interaction) => {

        const embed = new MessageEmbed()
            .setTitle("Gifty Bot")
            .setDescription(`<a:ayukleniyor:976807798123933747> **Ping Değeri**: ${client.ws.ping} ms`)
            .setImage("https://media.discordapp.net/attachments/931971324975407144/977959099734048828/indir.png?width=307&height=144")

        if (client.ws.ping < 60) embed.setColor("GREEN")
        else if (client.ws.ping > 60 && client.ws.ping < 120) embed.setColor("YELLOW")
        else if (client.ws.ping > 120) embed.setColor("RED")


        interaction.reply({ embeds: [embed] });

    }
};