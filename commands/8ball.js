const Discord = require("discord.js");
const errors = require("../utils/errors.js");
let config = require("../data/config.json");

module.exports.run = async (bot, message, args) => {
  await message.delete();
  if(!args[2]) return errors.noQuestion(message, ";8ball <Question>");
  let replies = ["Reply #1", "Reply #2", "Reply #3"];
  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(0).join(" ");
    
  let embed = new Discord.RichEmbed()
  .setColor(config.blue)
  .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
  .addField("Question:", question)
  .addField("Answer:", replies[result])
  .setTimestamp();
    
  message.channel.send(embed);
}

module.exports.help = {
  name: "8ball"
}
