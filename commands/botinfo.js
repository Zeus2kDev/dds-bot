const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  await message.delete();
  message.channel.send({files: ["./images/Information.png"]})
}

module.exports.help = {
    name: "botinfo"
}
