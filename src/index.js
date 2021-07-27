require("dotenv").config();
const Discord = require("discord.js");

const { startClientFeatures } = require("./clientFeatures/startClientFeatures");

const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
client.login(process.env.TOKEN);

startClientFeatures(client);
