const Discord = require("discord.js")
let config = require("../data/config.json");
let package = require("../package.json");

module.exports = bot => {
    console.log("------------------------STATUS------------------------");
    console.log(`${new Date()}`);
    console.log(`DDS v${package.version}`);
    console.log(`Logged in as ${bot.user.tag} (${bot.user.id})`);
    console.log("------------------------STATUS------------------------");

    let statuses = [
        `${bot.guilds.size} servers!`,
        `${config.prefix}help`,
        `over ${bot.users.size} users!`
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING"});
        bot.user.setStatus('online');
    }, 3000)
}
