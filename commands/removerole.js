const Discord = require("discord.js");
const errors = require("../utils/errors.js");
let config = require("../data/config.json");

module.exports.run = async (bot, message, args) => {
  await message.delete();
  if(!message.member.roles.some(role=>["ROLE NAME #1", "ROLE NAME #2", "ROLE NAME #3"].includes(role.name))) return errors.noPerms(message, ";removerole <user> <role>", "Try becoming an HR!");
  let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!member) return errors.cantfindUser(message, ";removerole <user> <role>");
  let role = args.join(" ").slice(22);
  if (!role) return errors.noRole(message, ";removerole <user> <role>");
  let gRole = message.guild.roles.find(`name`, role);
  if (!gRole) return errors.noRole(message, ";removerole <user> <role>");

  if(!member.roles.has(gRole.id)) return errors.errorRole(message, member, gRole, "doesn't have", ";removerole <user> <role>");
  await(member.removeRole(gRole.id));

  let embed = new Discord.RichEmbed()
  .setColor(config.red)
  .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
  .setDescription(`${gRole.name} has been removed from <@${member.id}>.`)
  .setTimestamp();

  message.channel.send(embed);

  let logEmbed = new Discord.RichEmbed()
  .setColor(config.red)
  .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
  .addField("Removed Role User:", `<@${member.id}>`)
  .addField("Description:", `${gRole.name} has been removed.`)
  .addField("Command Usage:", ";removerole <user> <role>", true)
  .addField("Server:", message.guild.name, true)
  .addField("Channel:", message.channel, true)
  .setFooter("DDS HR Command Log")
  .setTimestamp();

  bot.guilds.get("GUILD ID").channels.get("CHANNEL ID").send(logEmbed);
}

module.exports.help = {
  name: "removerole"
}
