const { MessageEmbed,Client,CommandInteraction } = require("discord.js");
module.exports = {
    name: "avatar",
    description: '> Belirtilen Kullanıcının Avatarını Verir',
    options: [
      {
        name:"kullanıcı",
        description: "Avatarını Almak İstediğiniz Kullanıcıyı Belirtin",
        type:6
      }
    ],
      /**
       * 
       * @param {Client} client 
       * @param {CommandInteraction} interaction 
       */
    run: async (client, interaction) => {
       const target = interaction.options.getMember("kullanıcı") || interaction.member;

      interaction.reply({
        embeds:[
          new MessageEmbed()
          .setImage(target.user.avatarURL({dynamic:true,size:2048}))
          .setFooter({text:`${interaction.member.user.tag} İstedi`})
        ]
      })
      
}
};