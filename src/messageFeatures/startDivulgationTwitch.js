const fs = require("fs");
const axios = require("axios");

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
      axios({
        method: "get",
        url: "https://api.twitch.tv/helix/streams?user_login=" + streamer.name,
        headers: {
          Authorization: "Bearer " + process.env.TOKEN_TWITCH,
          "Client-Id": process.env.CLIENT_ID,
        },
      })
        .then((data) => {
          const streamerData = data.data.data[0];
          if (streamerData != undefined && !streamersOn.get(streamer.name)) {
            streamersOn.set(streamer.name, streamerData);
            client.channels.cache
              .get("763505017944277003")
              .send(
                "**" +
                  streamer.name +
                  "**" +
                  " Está on! \n_" +
                  streamerData.game_name +
                  "_\nhttps://twitch.tv/" +
                  streamer.name
              );
          } else if (
            streamersOn.get(streamer.name) &&
            streamerData == undefined
          ) {
            streamersOn.delete(streamer.name);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }, 20000);
};
