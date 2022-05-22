const { MessageEmbed, Client, CommandInteraction } = require("discord.js");
const axios = require("axios");
module.exports = {
    name: "woman",
    description: '> Rastegele Kadın Gif/PP Verir',
    options: [],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {

        axios.get("https://api.roxza.me/v1/random?type=woman")
            .then(res => {
                const embed = new MessageEmbed()
                    .setImage(res.data.url)
                    .setFooter({ text: `${interaction.member.user.tag} İstedi` })
                interaction.reply({ embeds: [embed] });
            })
            .catch(() => {
                interaction.reply({ content: "Bir Hata Oluştu, Tekrar Dene", ephemeral: true });
            })
    }
};