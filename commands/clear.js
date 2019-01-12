const Discord = require("discord.js");
const errors = require("../utils/errors.js");
let config = require("../data/config.json");

module.exports.run = async (bot, message, args) => {
    if(!message.member.roles.some(role=>["ROLE NAME #1", "ROLE NAME #2", "ROLE NAME #3"].includes(role.name))) return errors.noPerms(message, ";clear <number>", "Try becoming an HR!");
    if(!args[0]) return errors.noNumber(message);
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
    });

    let embed = new Discord.RichEmbed()
    .setColor(config.red)
    .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
    .addField("Description:", `Cleared ${args[0]} messages.`)
    .addField("Command Usage:", ";clear <number>", true)
    .addField("Server:", message.guild.name, true)
    .addField("Channel:", message.channel, true)
    .setFooter("DDS HR Command Log")
    .setTimestamp();

    bot.guilds.get("GUILD ID").channels.get("CHANNEL ID").send(embed);
}

module.exports.help = {
    name: "clear"
}
