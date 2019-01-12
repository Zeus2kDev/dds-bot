const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const errors = require("../utils/errors.js");
let warns = JSON.parse(fs.readFileSync("./data/warnings.json", "utf8"));
let config = require("../data/config.json");

module.exports.run = async (bot, message, args) => {
  await message.delete();
  if(!message.member.roles.some(role=>["ROLE NAME #1", "ROLE NAME #2", "ROLE NAME #3"].includes(role.name))) return errors.noPerms(message, ";moderation <user>", "Try becoming an MR+!");
  let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!member) return errors.cantfindUser(message, ";moderation <user>");
  if(member.id === bot.user.id) return errors.botuser(message, "You cannot moderate a bot.", ";moderation <user>"); 
  let warnlevel = warns[member.id].warns;

  let embed = new Discord.RichEmbed()
  .setColor(config.red)
  .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
  .addField("User:", `${member}`)
  .addField("Description:", `${warnlevel} warning(s).`)
  .addField("Command Usage:", ";moderation <user>", true)
  .addField("Server:", message.guild.name, true)
  .addField("Channel:", message.channel, true)
  .setFooter("DDS Moderation Log")
  .setTimestamp();

  message.channel.send(embed);
}

module.exports.help = {
  name: "moderation"
}
