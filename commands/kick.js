const Discord = require("discord.js");
const Kick = require("../models/kick.js");
const mongoose = require("mongoose");
const moment = require("moment");
const errors = require("../utils/errors.js");
let config = require("../data/config.json");
require("moment-duration-format");
mongoose.connect('mongodb://localhost/DDS', {
  useNewUrlParser: true
});

module.exports.run = async (bot, message, args) => {
  await message.delete();
  if(!message.member.roles.some(role=>["ROLE NAME #1", "ROLE NAME #2", "ROLE NAME #3"].includes(role.name))) return errors.noPerms(message, ";kick <user> <reason>", "Try becoming an MR+!");
  let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!member) return errors.cantfindUser(message, ";kick <user> <reason>");
  if(member.id === bot.user.id) return errors.botuser(message, "You cannot kick a bot.", ";kick <user> <reason>"); 
  let reason = args.slice(1).join(' ');
  if(!reason) return errors.noReason(message, ";kick <user> <reason>");
  if(member.hasPermission("MANAGE_MESSAGES")) return errors.equalPerms(message, member, ";kick <user> <reason>");

  let embed = new Discord.RichEmbed()
  .setColor(config.red)
  .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
  .addField("Kicked User:", member)
  .addField("Description:", reason)
  .addField("Command Usage:", ";kick <user> <reason>", true)
  .addField("Server:", message.guild.name, true)
  .addField("Channel:", message.channel, true)
  .setFooter("DDS HR Command Log")
  .setTimestamp();
      
  bot.guilds.get("GUILD ID").channels.get("CHANNEL ID").send(embed);
  
  const kick = new Kick({
    _id: mongoose.Types.ObjectId(),
    server: message.guild.name,
    username: member.user.username,
    userID: member.id,
    reason: reason,
    kUsername: message.author.username,
    kID: message.author.id,
    time: moment.utc(message.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")
  });
  
  kick.save()
  .then(results => console.log(results))
  .catch(err => console.log(err));
  
  message.reply("That kick has been saved to my database.");
}

module.exports.help = {
    name: "kick"
}
