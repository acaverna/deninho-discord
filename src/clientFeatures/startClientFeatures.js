const { clientOnMessage } = require("./clientOnMessage");
const { clientOnMessageReactionAdd } = require("./clientOnMessageReactionAdd");
const { clientOnReady } = require("./clientOnReady");

exports.startClientFeatures = (client) => {
  clientOnMessage(client);
  clientOnMessageReactionAdd(client);
  clientOnReady(client);
};
