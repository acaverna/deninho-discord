const fs = require("fs");

exports.lagostaVrau = (client) => {
  fs.readFile("./data/lagosta.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    const lagostaFrasesFilosoficas = data.split("\n");

    const lagostaFraseFilosofica =
      lagostaFrasesFilosoficas[
        Math.floor(Math.random() * lagostaFrasesFilosoficas.length)
      ];

    client.channels.cache
      .get("785199914773774386")
      .send(
        "A Lagosta, olhou para o abismo do mar, e disse: " +
          "**" +
          lagostaFraseFilosofica +
          "**"
      );
  });
};
