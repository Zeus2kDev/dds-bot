const Discord = require("discord.js");
const errors = require("../utils/errors.js");
let config = require("../data/config.json");

module.exports.run = async (bot, message, args) => {
  await message.delete();
  if(!message.member.roles.some(role=>["ROLE NAME #1", "ROLE NAME #2", "ROLE NAME #3"].includes(role.name))) return errors.noPerms(message, ";dm <user> <reason>", "Try becoming an HR!");
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!member) return errors.cantfindUser(message, ";dm <user> <reason>");
  if(member.id === bot.user.id) return errors.botuser(message, "You cannot dm a bot.", ";dm <user> <reason>"); 
  let reason = args.slice(1).join(' ');
  if(!reason) return errors.noReason(message.channel, ";dm <user> <reason>");
  member.send(`${reason}`);

  let embed = new Discord.RichEmbed()
  .setColor(config.blue)
  .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
  .setDescription(`Your direct message to ${message.author} has been sent.`)
  .setFooter("DDS HR Command Log")
  .setTimestamp();

  message.channel.send(embed).then(m => m.delete(5000));

  let logEmbed = new Discord.RichEmbed()
  .setColor(config.red)
  .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
  .addField("DMed User:", member)
  .addField("Description:", "``" + reason + "``")
  .addField("Command Usage:", ";dm <user> <reason>", true)
  .addField("Server:", message.guild.name, true)
  .addField("Channel:", message.channel, true)
  .setFooter("DDS HR Command Log")
  .setTimestamp();
      
  bot.guilds.get("GUILD ID").channels.get("CHANNEL ID").send(logEmbed);
}

module.exports.help = {
  name: "dm"
}
