const fs = require("fs");
const https = require("https");

exports.startDivulgationTwitch = (client) => {
  const streamers = JSON.parse(
    fs.readFileSync(__dirname + "/../data/streamers.json", {
      encoding: "utf8",
      flag: "r",
    })
  );

  const streamersOn = new Map();

  setInterval(() => {
    streamers.forEach((streamer) => {
      https.get(
        "https://api.twitch.tv/kraken/streams/" + streamer.id,
        {
          headers: {
            Accept: "application/vnd.twitchtv.v5+json",
            "Client-ID": process.env.CLIENT_ID,
          },
        },
        (res) => {
          if (res.statusCode !== 200) {
            console.error(
              `Did not get an OK from the server. Code: ${res.statusCode}`
            );
            res.resume();
            return;
          }

          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("close", () => {
            streamerData = JSON.parse(data);
            if (
              streamerData.stream != null &&
              !streamersOn.get(streamer.name)
            ) {
              streamersOn.set(streamer.name, streamerData);
              client.channels.cache
                .get("763505017944277003")
                .send(
                  "**" +
                    streamer.name +
                    "**" +
                    " Está on! \n_" +
                    streamerData.stream.channel.status +
                    "_\nhttps://twitch.tv/" +
                    streamer.name
                );
            }
            if (streamersOn.get(streamer.name) && streamerData.stream == null) {
              streamersOn.delete(streamer.name);
            }
          });
        }
      );
    });
  }, 20000);
};
