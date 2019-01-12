const Discord = require("discord.js");
const errors = require("../utils/errors.js");
let config = require("../data/config.json");

module.exports.run = async (bot, message, args) => {
  await message.delete();
  if(!message.member.roles.some(role=>["ROLE NAME #1", "ROLE NAME #2", "ROLE NAME #3"].includes(role.name))) return errors.noPerms(message, ";say <reason>", "Try becoming an HR!");
  let reason = args.join(' ');
  if(!reason) return errors.noReason(message.channel, ";say <reason>");
  message.channel.send(reason);

  let embed = new Discord.RichEmbed()
  .setColor(config.red)
  .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
  .addField("Description:", reason)
  .addField("Command Usage:", ";say <message>", true)
  .addField("Server:", message.guild.name, true)
  .addField("Channel:", message.channel, true)
  .setFooter("DDS HR Command Log")
  .setTimestamp();
    
  bot.guilds.get("GUILD ID").channels.get("CHANNEL ID").send(embed);
}

module.exports.help = {
  name: "say"
}
