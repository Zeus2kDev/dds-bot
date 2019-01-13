const Discord = require("discord.js");
const moment = require("moment");
const errors = require("../utils/errors.js");
const status = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline/Invisible"
};
let config = require("../data/config.json");
require("moment-duration-format");

module.exports.run = async (bot, message, args) => {
  await message.delete();
  let member = message.mentions.members.first();
  if(!member) return errors.cantfindUser(message, ";userinfo <user>");

  let embed = new Discord.RichEmbed()
  .setColor(config.blue)
  .setAuthor(`${member.user.tag} (${member.id})`, member.user.avatarURL)
  .setThumbnail(member.user.displayAvatarURL)
  .addField("Nickname:", `${member.nickname !== null ? `${member.nickname}` : "No nickname"}`, true)
  .addField("Status:", `${status[member.user.presence.status]}`, true)
  .addField(`Roles [${member.roles.size - 1}]:`, `${member.roles.filter(r => r.id !== message.guild.id).map(roles => `${roles}`).join(" **|** ") || "No Roles"}`, true)
  .addField("Joined:", `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
  .addField("Registered:", `${moment.utc(member.user.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
  .setFooter(`Asked by ${message.author.username}`, message.author.avatarURL)
  .setTimestamp();
  
  message.channel.send(embed);
}

module.exports.help = {
  name: "userinfo"
}
