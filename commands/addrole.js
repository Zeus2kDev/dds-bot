const Discord = require("discord.js");
const errors = require("../utils/errors.js");
let config = require("../data/config.json");

module.exports.run = async (bot, message, args) => {
  await message.delete();
  if(!message.member.roles.some(role=>["DDS Executive", "DD Executive"].includes(role.name))) return errors.noPerms(message, ";addrole <user> <role>", "Try becoming an HR!");
  let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!member) return errors.cantfindUser(message, ";addrole <user> <reason>");
  let role = args.join(" ").slice(22);
  if (!role) return errors.noRole(message, ";addrole <user> <role>");
  let gRole = message.guild.roles.find(`name`, role);
  if (!gRole) return errors.noRole(message, ";addrole <user> <role>");
  
  if (member.roles.has(gRole.id)) return errors.errorRole(message, member, gRole, "already has", ";addrole <user> <role>");
  await (member.addRole(gRole.id));

  let embed = new Discord.RichEmbed()
  .setColor(config.green)
  .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
  .setDescription(`<@${member.id}> has been given ${gRole.name}.`)
  .setTimestamp();

  message.channel.send(embed);

  let logEmbed = new Discord.RichEmbed()
  .setColor(config.red)
  .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
  .addField("Added Role User:", `<@${member.id}>`)
  .addField("Description:", `${gRole.name} has been added.`)
  .addField("Command Usage:", ";addrole <user> <role>", true)
  .addField("Server:", message.guild.name, true)
  .addField("Channel:", message.channel, true)
  .setFooter("DDS HR Command Log")
  .setTimestamp();

  bot.guilds.get("GUILD ID").channels.get("CHANNEL ID").send(logEmbed);
}

module.exports.help = {
  name: "addrole"
}
