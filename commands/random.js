const Discord = require("discord.js");
let config = require("../data/config.json");

module.exports.run = async (bot, message, args) => {
  await message.delete();
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  let embed = new Discord.RichEmbed()
  .setColor(config.red)
  .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
  .setDescription(`**You got:** ${getRandomInt(100)}`)
  .setTimestamp();
  
  message.channel.send(embed);
}

module.exports.help = {
  name: "random"
}
