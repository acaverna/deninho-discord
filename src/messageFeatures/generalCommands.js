require("dotenv").config();
const fs = require("fs");

const Discord = require("discord.js");
const { salvarPontos } = require("./salvarPontos");
const { verRanking } = require("./verRanking");

const vips = process.env.VIPS.split(",");

const admin = require("firebase-admin");
let serviceAccount = JSON.parse(process.env.CREDENTIALS);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
let db = admin.firestore();

let eitaCounter = 0;
let caraioCounter = 0;
let panificadoraAlfaCounter = 0;

const emojiPadrao = "<:KappaGolden:777234103543136256>";
var block = false;

let spinOptions = [
  "deninha:776790121399451718",
  "patocorniopink:764155550941315084",
  "jpbrab0EIsso:771852824715067412",
  "pachic2Oo:764136010744332328",
  "Kappa:775520055756324894",
  "deninho:777326021007245323",
  "D_:776935665081516092",
];

let specialBomDiaMessages = [
  "Bom dia é o caralho",
  "Aqui é o grupo dos patocórnios pistola, bom dia é o caralho",
  "Que o seu dia seja iluminado por deno, tenha um maravilhoso dia!",
  "Bom dia rosa do meu jardim de Éden, espero que o seu dia seja tão linde quanto você!",
];

let specialBoaNoiteMessages = [
  "Boa noite é o caralho",
  "Dormindo tarde assim só a manhã vai ser boa mesmo",
  "Que a sua noite seja maravilhosa, revigorante e abençoada pelo Deno",
  "Durma com os anjos pessoa tão linde quanto uma bela noite de verão",
];

exports.generalCommands = async (message, splitMessage) => {
  const deninhoReact = "777326021007245323";
  const username = message.author.username;
  const userId = message.author.id;

  if (message.content.startsWith("bom dia") || message.content == "dia") {
    if (Math.random() >= 0.9 && vips.includes(userId)) {
      var messageBomDia =
        specialBomDiaMessages[
          Math.floor(Math.random() * specialBomDiaMessages.length)
        ];
      message.reply(messageBomDia);
    } else {
      message.reply(`Bom Dia!`);
    }
    message.react(deninhoReact);
  } else if (
    message.content.startsWith("boa tarde") ||
    message.content == "tarde"
  ) {
    message.reply(`Boa tarde`);
    message.react(deninhoReact);
  } else if (
    message.content.startsWith("boa noite") ||
    message.content == "noite"
  ) {
    if (Math.random() >= 0.9 && vips.includes(userId)) {
      var messageBoaNoite =
        specialBoaNoiteMessages[
          Math.floor(Math.random() * specialBoaNoiteMessages.length)
        ];
      message.reply(messageBoaNoite);
    } else {
      message.reply(`Boa Noite!`);
    }
    message.react(deninhoReact);
  } else if (message.content.startsWith("boas festas")) {
    message.reply(`Boas Festas!`);
    message.react(deninhoReact);
  } else if (splitMessage[0] == "!eita") {
    eitaCounter++;
    message.reply(`A Lexyca já falou eita ${eitaCounter} vezes`);
    message.react(deninhoReact);
  } else if (splitMessage[0] == "!caraio") {
    caraioCounter++;
    message.reply(`A Pachi já falou caraio ${caraioCounter} vezes`);
    message.react(deninhoReact);
  } else if (splitMessage[0] == "!alfa") {
    panificadoraAlfaCounter++;
    message.reply(
      `Já escutamos Panificadora Alfa ${panificadoraAlfaCounter} vezes`
    );
    message.react(deninhoReact);
  } else if (splitMessage[0] == "!selvagem") {
    message.reply(
      "Vá na live do pokemao dar o seu !selvagem https://twitch.tv/pokemaobr"
    );
    message.react(deninhoReact);
  } else if (splitMessage[0] == "!capturar") {
    message.reply(
      "Vá na live do pokemao dar o seu !capturar https://twitch.tv/pokemaobr"
    );
    message.react(deninhoReact);
  } else if (splitMessage[0] == "!selva") {
    message.reply(
      "Vá na live do pokemao dar o seu !selva https://twitch.tv/pokemaobr"
    );
    message.react(deninhoReact);
  } else if (splitMessage[0] == "!bifeday") {
    now = new Date();

    if (now.getMonth() == 3 && now.getDate() == 20) {
      message.reply("BIFEDAY!");
    } else {
      message.reply("noti tuday.");
    }
  } else if (splitMessage[0] == "!amor") {
    message.reply("Amor!", { files: ["../img/pachiLuv.png"] });
    message.react(deninhoReact);
  } else if (splitMessage[0] == "!cancelar") {
    cancelamentosBrute = fs.readFileSync(
      __dirname + "/../data/cancelamentos.txt",
      "utf8"
    );
    cancelamentos = cancelamentosBrute.split("\n");

    var cancelamento =
      cancelamentos[Math.floor(Math.random() * cancelamentos.length)];

    if (splitMessage[1]) {
      message.reply(`cancelou ${splitMessage[1]} por ${cancelamento}`);
    } else {
      message.reply(`cancelou o mundo por ${cancelamento}`);
    }
  } else if (splitMessage[0] == "!padrao") {
    if (splitMessage[1]) {
      const standard = splitMessage[1].toLowerCase();
      const channel = message.channel.name;
      fs.writeFileSync(`padrao-${channel}.txt`, standard);
      message.delete();
    }
  } else if (splitMessage[0] == "!vergonha") {
    try {
      const breakersBrute = fs.readFileSync("breakers.txt", "utf8");
      const breakersLine = breakersBrute.split("\n");
      breakersMessage = "";

      breakersLine.forEach((breaker) => {
        if (breaker != "") {
          breakerData = breaker.split(",");

          breakersMessage += `\n${breakerData[0]} quebrou o padrão ${breakerData[1]} vezes`;
        }
      });

      message.reply(breakersMessage);
    } catch (err) {}
  } else if (splitMessage[0] == "!clap") {
    userClapped = splitMessage[1];

    message.delete();
    message.channel.send(`${userClapped} CLAP`, { files: ["../img/clap.gif"] });
  } else if (splitMessage[0] == "!spin") {
    //Retorna se tiver um spin em andamento
    if (block) {
      message.reply(`Parabéns, é spam <:${spinOptions[3]}>`);
      return;
    } else if (
      message.channel.name.includes("cassino") ||
      message.channel.name.includes("teste-bot")
    ) {
      let sorteados = [];
      block = true;

      for (let i = 0; i < 3; i++) {
        let sorteado =
          spinOptions[Math.floor(Math.random() * spinOptions.length)];
        sorteados.push(sorteado);
      }

      let msg = await message.channel.send(
        `${emojiPadrao} ${emojiPadrao} ${emojiPadrao}`
      );

      setTimeout(() => {
        msg.edit(`<:${sorteados[0]}> ${emojiPadrao} ${emojiPadrao}`);
      }, 1000);

      setTimeout(() => {
        msg.edit(`<:${sorteados[0]}> <:${sorteados[1]}> ${emojiPadrao}`);
      }, 2000);

      setTimeout(() => {
        msg.edit(`<:${sorteados[0]}> <:${sorteados[1]}> <:${sorteados[2]}>`);
      }, 3000);

      setTimeout(() => {
        if (sorteados[0] === sorteados[1] && sorteados[0] === sorteados[2]) {
          message.reply(`Parabéns você acaba de ganhar <:${sorteados[0]}>`);

          salvarPontos(db, username, 100);
        } else {
          message.reply(`Parabéns você perdeu`);

          salvarPontos(db, username, 0);
        }
        block = false;
      }, 3500);
    }
  } else if (splitMessage[0] == "!roll") {
    if (
      message.channel.name.includes("cassino") ||
      message.channel.name.includes("teste-bot")
    ) {
      const randomNumber = Math.random() * 100;
      const formatNumber = new Intl.NumberFormat("pt-BR", {
        maximumSignificantDigits: 2,
      }).format(randomNumber);
      if (randomNumber >= 99) {
        message.reply(
          `Você tirou ${formatNumber}, Parabéns, Você ganhou com pontos elevados!`
        );
        salvarPontos(db, username, 150);
      } else if (randomNumber >= 95) {
        message.reply(`Você tirou ${formatNumber}, Parabéns, Você ganhou!`);
        salvarPontos(db, username, 10);
      } else {
        message.reply(`Você tirou ${formatNumber}, Parabéns, Você perdeu!`);
        salvarPontos(db, username, 0);
      }
    }
  } else if (splitMessage[0] == "!rank") {
    if (
      message.channel.name.includes("cassino") ||
      message.channel.name.includes("teste-bot")
    ) {
      let msg = await verRanking(db, username, userId);
      message.channel.send(msg);
    }
  } else if (splitMessage[0] == "!poll") {
    let question = "";

    for (i = 1; i < splitMessage.length; i++) {
      question += splitMessage[i] + " ";
    }

    message.delete();

    message.channel
      .send(message.author.username + ": **" + question + "**")
      .then((message) => {
        message.react("✅");
        message.react("❌");
      });
  } else if (splitMessage[0] == "!jureg") {
    message.channel.send(`
⡴⠑⡄⠀⠀⠀⠀⠀⠀⠀⣀⣀⣤⣤⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠸⡇⠀⠿⡀⠀⠀⠀⣀⡴⢿⣿⣿⣿⣿⣿⣿⣿⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠑⢄⣠⠾⠁⣀⣄⡈⠙⣿⣿⣿⣿⣿⣿⣿⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⢀⡀⠁⠀⠀⠈⠙⠛⠂⠈⣿⣿⣿⣿⣿⠿⡿⢿⣆⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⢀⡾⣁⣀⠀⠴⠂⠙⣗⡀⠀⢻⣿⣿⠭⢤⣴⣦⣤⣹⠀⠀⠀⢀⢴⣶⣆
      ⠀⠀⢀⣾⣿⣿⣿⣷⣮⣽⣾⣿⣥⣴⣿⣿⡿⢂⠔⢚⡿⢿⣿⣦⣴⣾⠁⠸⣼⡿
      ⠀⢀⡞⠁⠙⠻⠿⠟⠉⠀⠛⢹⣿⣿⣿⣿⣿⣌⢤⣼⣿⣾⣿⡟⠉⠀⠀⠀⠀⠀
      ⠀⣾⣷⣶⠇⠀⠀⣤⣄⣀⡀⠈⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀
      ⠀⠉⠈⠉⠀⠀⢦⡈⢻⣿⣿⣿⣶⣶⣶⣶⣤⣽⡹⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠉⠲⣽⡻⢿⣿⣿⣿⣿⣿⣿⣷⣜⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣷⣶⣮⣭⣽⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⣀⣀⣈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠻⠿⠿⠿⠿⠛⠉
      `);
  } else if (splitMessage[0] == "!paidapation") {
    message.channel.send(`
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣶⡀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⢱⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣷⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣶⡀⠀⠀⠀⠀⣀⣀⣀⣀⣀⣼⣿⣿⡏⢹⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⡿⣻⣿⡷⣿⣿⣿⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀⠀
      ⠀⠀⢀⣀⣠⠤⣤⣤⣼⣿⣿⣿⣇⢋⠟⣿⡿⠿⠛⠛⠛⠛⠛⠛⠿⢧⣤⣀⣀⠀
      ⢠⡖⠉⠴⢾⣿⡿⠋⠐⠈⢹⣿⣇⠢⡎⠁⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠈⣿⣿⡇
      ⢸⠁⠀⣃⣀⠃⠀⠀⠀⠀⢸⡟⠀⠈⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⠀⣿⠁⠀
      ⠈⡇⠀⠈⠉⠁⠀⠀⠀⠀⡜⠀⢰⡀⠘⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⠀⠀
      ⠀⠹⡀⠀⠀⠀⠀⠀⡠⠚⣠⣔⣶⠀⢀⡘⢦⣀⠀⠀⠀⠀⠀⠀⠀⢀⣾⢿⡆⠀
      ⠀⠀⠈⠐⠲⠶⠒⠋⠁⢾⡎⠻⠉⠡⠾⠋⣀⡈⠙⢒⣒⠠⠤⣤⣖⣿⣿⣿⡇⠀
      ⠀⠀⠀⠀⠀⠀⣄⡀⠀⢋⠉⠀⠁⠀⠐⠐⠲⣶⣶⣿⠧⠁⢀⠶⣿⢿⣿⣿⣿⣄
      ⠀⠀⠀⠀⠀⣆⣙⢿⣷⣼⣛⠿⡷⠶⢶⣶⡾⢟⡋⢅⠀⠀⠀⢈⣁⣺⣿⣿⣿⣿
      ⠀⠀⢀⢀⣠⣿⣿⣯⣭⣽⣿⡿⠛⠻⢿⣿⣯⣧⡨⣮⡶⡤⠢⠽⠽⠿⣿⣿⣷⣿
      ⠀⠀⡨⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⢷⣤⠉⢹⣯⣿⣜⣟⠊⠁⠀⣰⢶⣿⣿⣿⣿
      ⠀⢼⢻⣿⣿⣿⣿⣿⣿⣿⣟⢹⣿⡿⡵⣴⡌⠋⡟⠿⠎⡓⠞⠏⠙⠉⣉⣄⣼⣶
      `);
  } else if (splitMessage[0] == "!convite") {
    message.reply("Está aqui o seu convite https://caverna.live/discord");
  } else if (
    splitMessage[0] == "!chalupa" ||
    splitMessage[0] == "!chapuleta" ||
    splitMessage[0] == "!chulapa" ||
    splitMessage[0] == "!chulipa" ||
    splitMessage[0] == "!xalupa" ||
    splitMessage[0] == "!xapuleta" ||
    splitMessage[0] == "!xulapa" ||
    splitMessage[0] == "!xulipa"
  ) {
    message.reply(
      "https://cdn.discordapp.com/attachments/785199914773774386/836271433364668456/result.gif"
    );
  } else if (splitMessage[0] == "!jp" || splitMessage[0] == "!teclado") {
    message.reply("https://giphy.com/gifs/frustrated-keyboard-g8GfH3i5F0hby");
  } else if (splitMessage[0] == "!fofoca") {
    const fofoca = new Discord.MessageEmbed()
      .setTitle("Fofoca")
      .setImage("https://i.imgur.com/jObHGfU.png");

    message.channel.send(fofoca);
  }
};
