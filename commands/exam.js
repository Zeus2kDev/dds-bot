const Discord = require("discord.js");
const fs = require("fs");
const Exam = require("../models/exam.js");
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
    if(!message.member.roles.some(role=>["ROLE #1", "ROLE #2", "ROLE #3"].includes(role.name))) return errors.noPerms(message, ";exam", "Try becoming an SSO!");
    if(!message.member.roles.some(role=>["ROLE #1", "ROLE #2", "ROLE #3"].includes(role.name))) return errors.noExams(message);

    let embed = new Discord.RichEmbed()
    .setColor(config.green)
    .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
    .setDescription("Exam Request")
    .addField("Username:", message.guild.members.get(message.author.id).displayName)
    .addField("Channel:", message.channel)
    .addField("Time:", `${moment.utc(message.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
    .setTimestamp();
    
    bot.guilds.get("GUILD ID").channels.get("CHANNEL ID").send(embed);
    
    let sentEmbed = new Discord.RichEmbed()
    .setColor(config.green)
    .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
    .setDescription("Exam Request Sent")
    .addField("Username:", message.guild.members.get(message.author.id).displayName)
    .addField("Time:", `${moment.utc(message.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`);
    
    bot.guilds.get("GUILD ID").channels.get("CHANNEL ID").send(sentEmbed);

    let logEmbed = new Discord.RichEmbed()
    .setColor(config.green)
    .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
    .setDescription("Exam Log")
    .addField("Username:", message.guild.members.get(message.author.id).displayName)
    .addField("Time:", `${moment.utc(message.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`);
    
    bot.guilds.get("GUILD ID").channels.get("CHANNEL ID").send(logEmbed);
    
    const exam = new Exam({
        _id: mongoose.Types.ObjectId(),
        server: message.guild.name,
        username: message.author.username,
        userID: message.author.id,
        time: moment.utc(message.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")
    });
    
    exam.save()
    .then(results => console.log(results))
    .catch(err => console.log(err));
    
    message.reply("That exam has been saved to my database.");
}

module.exports.help = {
    name: "exam"
}
