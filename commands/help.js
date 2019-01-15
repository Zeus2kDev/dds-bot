const Discord = require("discord.js");
const { Client, RichEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {
const embed = new RichEmbed()
  .setTitle("Bot Commands")
  .setColor('BLUE')
  .setDescription("All commands are also on [your website here](your website here)")
  .setURL("your website")
  .setTimestamp("2019-01-15T04:02:48.476Z")
  .setFooter(".help", "CHANGEME") 
  .setThumbnail("CHANGEME")
  .setAuthor(".help", "CHANGE ME", "WEBSITE HERE")
  .addField(".help", "Prints out all of the available commands on YOURBOTSNAME", "false")
  .addField("COMMAND 1", "DESCRIPTION 1", "false")
  .addField("COMMAND 2", "DESCRIPTION 2", "false")
  .addField("COMMAND 3", "DESCRIPTION 3", "false")
  .addField("COMMAND 4", "DESCRIPTION 4", "false")
  .addField("COMMAND 5", "DESCRIPTION 5", "false")
  .addField("COMMAND 6", "DESCRIPTION 6", "false")
  .addField("COMMAND 7", "DESCRIPTION 7", "false")
  .addField("COMMAND 8", "DESCRIPTION 8", "false")
  .addField("COMMAND 9", "DESCRIPTION 9", "false")
  .addField("COMMAND 10", "DESCRIPTION 10 ", "false")
  .addField("COMMAND 11", "DESCRIPTION 11", "false")
  .addField("COMMAND 12", "DESCRIPTION 12", "false")
  message.channel.send(embed);
  //You can have up to 25 .addFields
  //all of the "false" are false to inlines which line them up side by side, doesn't look great imo but you can change it.
};


module.exports.help = {
  name:"help"
}
