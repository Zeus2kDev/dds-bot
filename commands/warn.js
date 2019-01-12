const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
const Warn = require("../models/warn.js");
const mongoose = require("mongoose");
const moment = require("moment");
const errors = require("../utils/errors.js");
let config = require("../data/config.json");
let warns = JSON.parse(fs.readFileSync("./data/warnings.json", "utf8"));
require("moment-duration-format");
mongoose.connect('mongodb://localhost/DDS', {
    useNewUrlParser: true
});

module.exports.run = async (bot, message, args) => {
    await message.delete();
    if(!message.member.roles.some(role=>["ROLE NAME #1", "ROLE NAME #2", "ROLE NAME #3"].includes(role.name))) return errors.noPerms(message, ";warn <user> <reason>", "Try becoming an MR+!");
    let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!member) return errors.cantfindUser(message, ";warn <user> <reason>");
    if(member.id === bot.user.id) return errors.botuser(message, "You cannot warn a bot.", ";warn <user> <reason>"); 
    if(member.hasPermissions("MANAGE_MESSAGES")) return errors.equalPerms(message, member, ";warn <user> <reason>");
    let reason = args.slice(1).join(' ');
    if(!reason) return errors.noReason(message, ";warn <user> <reason>");
    
    if(!warns[member.id]) warns[member.id] = {
        warns:0
    };
        
    warns[member.id].warns++;
        
    fs.writeFile("./data/warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err)
    });
        
    if(warns[member.id].warns == 3) {
        let muterole = message.guild.roles.find(`name`, "Muted");
        if(!muterole) return message.reply("You should create the mute role.");
        
        let mutetime = "24h";
        await(member.addRole(muterole.id));
        message.channel.reply(`${member} has been temporarily muted.`);

        let embed = new Discord.RichEmbed()
        .setColor(config.red)
        .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
        .addField("Muted User:", member)
        .addField("Description:", reason)
        .addField("Command Usage:", ";warn <user> <reason>", true)
        .addField("Server:", message.guild.name, true)
        .addField("Channel:", message.channel, true)
        .setFooter("DDS HR Command Log")
        .setTimestamp();
                
        bot.guilds.get("GUILD ID").channels.get("CHANNEL ID").send(embed);
        
        setTimeout(function(){
            member.removeRole(mutedrole.id);
            message.channel.reply(`They have been unmuted.`);
        }, ms(mutetime));
    }
        
    if(warns[member.id].warns == 4) {
        message.guild.member(member).kick(reason);
        message.reply(`${member} has been kicked.`);

        let embed = new Discord.RichEmbed()
        .setColor(config.red)
        .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
        .addField("Kicked User:", member)
        .addField("Description:", reason)
        .addField("Command Usage:", ";warn <user> <reason>", true)
        .addField("Server:", message.guild.name, true)
        .addField("Channel:", message.channel, true)
        .setFooter("DDS HR Command Log")
        .setTimestamp();
                
        bot.guilds.get("GUILD ID").channels.get("CHANNEL ID").send(embed);
    }
        
    if(warns[member.id].warns == 8) {
        message.guild.member(member).ban(reason);
        message.reply(`${member} has been banned.`);

        let embed = new Discord.RichEmbed()
        .setColor(config.red)
        .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
        .addField("Banned User:", member)
        .addField("Description:", reason)
        .addField("Command Usage:", ";warn <user> <reason>", true)
        .addField("Server:", message.guild.name, true)
        .addField("Channel:", message.channel, true)
        .setFooter("DDS HR Command Log")
        .setTimestamp();
                
        bot.guilds.get("GUILD ID").channels.get("CHANNEL ID").send(embed);
    }

    let embed = new Discord.RichEmbed()
    .setColor(config.red)
    .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
    .addField("Warned User:", member)
    .addField("Description:", reason)
    .addField("Command Usage:", ";warn <user> <reason>", true)
    .addField("Server:", message.guild.name, true)
    .addField("Channel:", message.channel, true)
    .setFooter("DDS HR Command Log")
    .setTimestamp();
            
    bot.guilds.get("GUILD ID").channels.get("CHANNEL ID").send(embed);
        
    const warn = new Warn({
        _id: mongoose.Types.ObjectId(),
        server: message.guild.name,
        username: member.user.username,
        userID: member.id,
        reason: reason,
        wUsername: message.author.username,
        wID: message.author.id,
        time: moment.utc(message.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")
    });
        
    warn.save()
    .then(results => console.log(results))
    .catch(err => console.log(err));
        
    message.reply("That warn has been saved to my database.");
}

module.exports.help = {
    name: "warn"
}
