const {
  kotlinautasGreetings,
} = require("../messageFeatures/kotlinautasGreetings");

exports.clientOnMessageReactionAdd = (client) => {
  client.on("messageReactionAdd", async (reaction, user) => {
    kotlinautasGreetings(reaction, user);
  });
};
