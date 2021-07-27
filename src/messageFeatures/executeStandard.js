const fs = require("fs");

exports.executeStandard = (message) => {
  try {
    const channel = message.channel.name;
    const standard = fs
      .readFileSync(`padrao-${channel}.txt`, "utf8")
      .toLowerCase();

    messageSplited = message.content.split(" ");

    if (
      message.content != standard &&
      standard != "" &&
      messageSplited[0] != "!padrao"
    ) {
      message.reply(
        "Você não seguiu o padrão! Adicionando mais uma quebra de padrão á sua ficha!"
      );

      fs.writeFileSync(`padrao-${channel}.txt`, "");

      try {
        const username = message.author.username;
        const breakersBrute = fs.readFileSync("breakers.txt", "utf8");
        const breakersLine = breakersBrute.split("\n");
        const breakers = [];

        breakersLine.forEach((breaker) => {
          breakers.push(breaker.split(","));
        });

        const index = findBreaker(breakers, username);

        if (index != -1) {
          const userData = breakers[index];
          const username = userData[0];
          const breaks = Number(userData[1]);

          const content = breakersBrute.replace(
            `${username},${breaks}`,
            `${username},${breaks + 1}`
          );

          fs.writeFileSync("breakers.txt", content);
        } else {
          fs.appendFileSync("breakers.txt", `${username},1\n`);
        }
      } catch (err) {}
    }
  } catch (err) {}
};
