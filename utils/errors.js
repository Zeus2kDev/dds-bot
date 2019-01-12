const Discord = require("discord.js");
const fs = require("fs");
let config = require("../data/config.json");
let package = require("../package.json");

module.exports.noQuestion = (message, command_usage) => {
    let embed = new Discord.RichEmbed()
    .setColor(config.red)
    .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
    .setTitle("Error!")
    .setDescription("You did something wrong.")
    .addField("Error Description:", "Invalid Question.")
    .addField("If you have questions about the bot:", `Contact @${package.author}`, true)
    .addField("Command Usage:", command_usage, true)
    .setFooter("Oppsies! Try again.")
    .setTimestamp();

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.noPerms = (message, command_usage, error_message) => {
    let embed = new Discord.RichEmbed()
    .setColor(config.red)
    .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
    .setTitle("Error!")
    .setDescription("You did something wrong.")
    .addField("Error Description:", "Insufficient Permissions.")
    .addField("If you have questions about the bot:", `Contact @${package.author}`, true)
    .addField("Command Usage:", command_usage, true)
    .setFooter(error_message)
    .setTimestamp();

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.equalPerms = (message, user, command_usage) => {
    let embed = new Discord.RichEmbed()
    .setColor(config.red)
    .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
    .setTitle("Error!")
    .setDescription("You did something wrong.")
    .addField("Error Description:", `${user} is an MR+.`)
    .addField("If you have questions about the bot:", `Contact @${package.author}`, true)
    .addField("Command Usage:", command_usage, true)
    .setFooter("Oppsies! Try again.")
    .setTimestamp();

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.noRole = (message, command_usage) => {
    let embed = new Discord.RichEmbed()
    .setColor(config.red)
    .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
    .setTitle("Error!")
    .setDescription("You did something wrong.")
    .addField("Error Description:", "Invalid Role.")
    .addField("If you have questions about the bot:", `Contact @${package.author}`, true)
    .addField("Command Usage:", command_usage, true)
    .setFooter("Oppsies! Try again.")
    .setTimestamp();

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.errorRole = (message, user, role, text, command_usage) => {
    let embed = new Discord.RichEmbed()
    .setColor(config.red)
    .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
    .setTitle("Error!")
    .setDescription("You did something wrong.")
    .addField("Error Description:", `${user} ` + text + ` ${role.name}.`)
    .addField("If you have questions about the bot:", `Contact @${package.author}`, true)
    .addField("Command Usage:", command_usage, true)
    .setFooter("Oppsies! Try again.")
    .setTimestamp();

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.botuser = (message, text, command_usage) => {
    let embed = new Discord.RichEmbed()
    .setColor(config.red)
    .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
    .setTitle("Error!")
    .setDescription("You did something wrong.")
    .addField("Error Description:", text)
    .addField("If you have questions about the bot:", `Contact @${package.author}`, true)
    .addField("Command Usage:", command_usage, true)
    .setFooter("Oppsies! Try again.")
    .setTimestamp();

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.cantfindUser = (message, command_usage) => {
    let embed = new Discord.RichEmbed()
    .setColor(config.red)
    .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
    .setTitle("Error!")
    .setDescription("You did something wrong.")
    .addField("Error Description:", "Invalid User.")
    .addField("If you have questions about the bot:", `Contact @${package.author}`, true)
    .addField("Command Usage:", command_usage, true)
    .setFooter("Oppsies! Try again.")
    .setTimestamp();

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.noNumber = (message) => {
    let embed = new Discord.RichEmbed()
    .setColor(config.red)
    .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
    .setTitle("Error!")
    .setDescription("You did something wrong.")
    .addField("Error Description:", "Invalid Number.")
    .addField("If you have questions about the bot:", `Contact @${package.author}`, true)
    .addField("Command Usage:", ";clear <number>", true)
    .setFooter("Oppsies! Try again.")
    .setTimestamp();

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.noExams = (message) => {
    let embed = new Discord.RichEmbed()
    .setColor(config.red)
    .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
    .setTitle("Error!")
    .setDescription("You did something wrong.")
    .addField("Error Description:", "Please head to ``pinned messages`` in ``#senior-officer`` to read the rules and regulations of using the exams command.")
    .addField("If you have questions about the bot:", `Contact @${package.author}`, true)
    .addField("Command Usage:", ";exam", true)
    .setFooter("Oppsies! Try again.")
    .setTimestamp();

    message.channel.send(embed).then(m => m.delete(5000));
}

module.exports.noReason = (message, command_usage) => {
    let embed = new Discord.RichEmbed()
    .setColor(config.red)
    .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
    .setTitle("Error!")
    .setDescription("You did something wrong.")
    .addField("Error Description:", "Invalid Reason.")
    .addField("If you have questions about the bot:", `Contact @${package.author}`, true)
    .addField("Command Usage:", command_usage, true)
    .setFooter("Oppsies! Try again.")
    .setTimestamp();

    message.channel.send(embed).then(m => m.delete(5000));
}
