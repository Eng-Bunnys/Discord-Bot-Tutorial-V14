const { EmbedBuilder } = require("discord.js");
const colours = require("../GBFColor.json");
const titles = require("../GBF/Embed Messages.json");

const ImageGenerating = new EmbedBuilder()
  .setTitle(`Generating image... <a:Loading:971730094169141248>`)
  .setColor(colours.DEFAULT)
  .setDescription(
    `This may take up to 2 minutes (Average 10s) depending on quality and server load`
  )
  .setTimestamp();

const APIError = new EmbedBuilder()
  .setTitle(titles.ERROR)
  .setDescription(
    `An error in the API occured, I've already reported it to my developers!\nPlease try again later.`
  )
  .setColor(colours.ERRORRED);

module.exports = {
  ImageGenerating,
  APIError
};