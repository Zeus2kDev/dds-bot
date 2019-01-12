const Discord = require("discord.js");
let config = require("../data/config.json");

module.exports.run = async (bot, message, args) => {
  await message.delete();
  message.channel.send("Pong!")
}

module.exports.help = {
  name: "ping"
}
