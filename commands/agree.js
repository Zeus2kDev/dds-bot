const Discord = require("discord.js");
const errors = require("../utils/errors.js");
let config = require("../data/config.json");

module.exports.run = async (bot, message, args) => {
    await message.delete();
    if(!message.member.roles.some(role=>["ROLE #1", "ROLE #2", "ROLE #3"].includes(role.name))) return errors.noPerms(message, ";agree", "Try becoming an SSO!");
    let memberRole = message.member.guild.roles.find('name', "ROLE");
    message.member.addRole(memberRole);

    let embed = new Discord.RichEmbed()
    .setColor(config.red)
    .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
    .setDescription("Text here.")
    .setTimestamp();

    message.channel.send(embed);
}

module.exports.help = {
    name: "agree"
}
