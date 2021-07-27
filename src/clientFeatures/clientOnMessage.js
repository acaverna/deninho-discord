const { executeStandard } = require("../messageFeatures/executeStandard");
const { generalCommands } = require("../messageFeatures/generalCommands");
const { reactToEIsso } = require("../messageFeatures/reactToEIsso");
const { reactToESobreIsso } = require("../messageFeatures/reactToESobreIsso");
const {
  reactToApresentation,
} = require("../messageFeatures/reactToApresentation");

exports.clientOnMessage = (client) => {
  client.on("message", (message) => {
    if (message.author.bot) return;
    message.content = message.content.toLowerCase();
    const splitMessage = message.content.split(" ");

    executeStandard(message);
    generalCommands(message, splitMessage);
    reactToApresentation(message);
    reactToEIsso(message);
    reactToESobreIsso(message);
  });
};
