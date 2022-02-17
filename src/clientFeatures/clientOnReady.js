const { lagostaVrau } = require("../messageFeatures/lagostaVrau");
const {
  startDivulgationTwitch,
} = require("../messageFeatures/startDivulgationTwitch");

exports.clientOnReady = (client) => {
  client.on("ready", () => {
    console.log(`Logged as ${client.user.tag}`);

    startDivulgationTwitch(client);

    //   lagostaVrau(client);
    //   setInterval(() => {
    //     lagostaVrau(client);
    //   }, 86400000);
  });
};
