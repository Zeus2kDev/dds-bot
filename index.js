const config = require("./data/config.json");
const tokenfile = require("./data/client.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
let package = require("./package.json");
let prefix = config.prefix;
bot.commands = new Discord.Collection();
require("./utils/eventHandler.js")(bot)

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands.");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded.`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("messageUpdate", async(oldMessage, newMessage) => {
    if (oldMessage.content === newMessage.content){
        return;
    }

    let logEmbed = new Discord.RichEmbed()
    .setColor(config.red)
    .setAuthor(`${oldMessage.author.tag} (${oldMessage.author.id})`, oldMessage.author.avatarURL)
    .addField("Before:", "``" + oldMessage.content + "``")
    .addField("After:", "``" + newMessage.content + "``")
    .addField("Server:", oldMessage.guild.name, true)
    .addField("Channel:", oldMessage.channel, true)
    .setFooter("DDS Message Log")
    .setTimestamp();

    bot.guilds.get("GUILD ID").channels.get("CHANNEL ID").send(logEmbed);
});

bot.on("messageDelete", async message => {
    let logEmbed = new Discord.RichEmbed()
    .setColor(config.red)
    .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
    .addField("Deleted Message:", "``" + message.content + "``")
    .addField("Server:", message.guild.name, true)
    .addField("Channel:", message.channel, true)
    .setFooter("DDS Message Log")
    .setTimestamp();

    bot.guilds.get("GUILD ID").channels.get("CHANNEL ID").send(logEmbed);
});

bot.on("message", async message => {
    if(message.author.bot) return;

    if (message.channel.type == 'dm') {
        let reason = message;

        let embed = new Discord.RichEmbed()
        .setColor(config.red)
        .setAuthor(`${message.author.tag} (${message.author.id})`, message.author.avatarURL)
        .addField("Direct Message:", reason)
        .addField("If you have questions about the bot:", `Contact @${package.author}`)
        .setFooter("DDS Direct Message Log")
        .setTimestamp();
    
        bot.guilds.get("GUILD ID").channels.get("CHANNEL ID").send(embed);
    }
    /*
    if (message.content == "Hello!") {
        botEmbed = new Discord.RichEmbed()
        .setColor(config.green)
        .setDescription("Hi!")

        message.channel.send(botEmbed);
    }
    */
   let messageArray = message.content.split(" ");
   let cmd = messageArray[0];
   let args = messageArray.slice(1);
   if (message.content.startsWith(prefix)){
       let commandfile = bot.commands.get(cmd.slice(prefix.length));
       if(commandfile) commandfile.run(bot,message,args);
    }else{
        // Nothing was put under this. You can put stuff under this, just note that it might not work.
    }
});


bot.login(tokenfile.token);
