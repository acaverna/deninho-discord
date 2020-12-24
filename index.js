require('dotenv').config();

const admin = require('firebase-admin');

let serviceAccount = JSON.parse(process.env.CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

let db = admin.firestore();

const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.TOKEN);

let eitaCounter = 0;
let caraioCounter = 0;
let panificadoraAlfaCounter = 0;
let spinOptions = [
  'deninha:776790121399451718',
  'patocorniopink:764155550941315084',
  'jpbrab0EIsso:771852824715067412',
  'pachic2Oo:764136010744332328',
  'Kappa:775520055756324894',
  'deninho:777326021007245323',
  'D_:776935665081516092',
];
const emojiPadrao = '<:KappaGolden:777234103543136256>';
var block = false;

client.on('ready', () => {
  console.log(`Logged as ${client.user.tag}`);
});

client.on('message', (message) => {
  if (message.author.bot) return;
  message.content = message.content.toLowerCase();
  const splitMessage = message.content.split(' ');

  reactToApresentation(message);
  reactToEIsso(message);
  executeStandard(message);
  generalCommands(message, splitMessage);
});

function salvarPontos(user, points) {
  users = [];

  const cassino = db.collection('cassino');
  cassino
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        userDoc = doc.data();

        users.push(userDoc.user);

        if (user == userDoc.user) {
          doc.ref.update({
            points: userDoc.points + points,
            plays: userDoc.plays + 1,
          });
        }
      });

      if (!users.includes(user)) {
        let userDoc = cassino.doc(user);

        userDoc.set({
          user: user,
          points: points,
          plays: 1,
        });
      }
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
}

function reactToApresentation(message) {
  if (message.channel.name == '👩🏻apresentação👨🏻') {
    const pachiHype = '764136952177229835';
    message.react(pachiHype);
  }
}

function reactToEIsso(message) {
  const accepts = ['é isso', 'e isso', 'É ISSO', 'E ISSO'];
  if (accepts.includes(message.content)) {
    const eisso = '771852824715067412';
    message.react(eisso);
  }
}

async function verRanking(username, userId) {
  rankingString = '';
  const connection = await db.collection('cassino').get();
  const usersBrute = connection._docs();
  const users = [];

  for (i = 0; i < usersBrute.length; i++) {
    let user = connection._docs()[i]._fieldsProto;
    users.push(user);
  }

  users.sort((a, b) => {
    if (Number(a.points.integerValue) > Number(b.points.integerValue)) {
      return -1;
    }
    if (Number(a.points.integerValue) < Number(b.points.integerValue)) {
      return 1;
    }
    if (Number(a.points.integerValue) == Number(b.points.integerValue)) {
      if (Number(a.plays.integerValue) > Number(b.plays.integerValue)) {
        return 1;
      }
      return -1;
    }
  });

  for (i = 0; i < users.length; i++) {
    let user = users[i];

    rankingString += `\n${i + 1}° **${user.user.stringValue}** com **${
      user.points.integerValue
    }** pontos, jogando **${user.plays.integerValue}** vezes`;

    if (user.user.stringValue == username) {
      var userData = user;
    }
  }
  if (userData) {
    rankingString += `\n\n Enquanto você, <@${userId}>, tem **${userData.points.integerValue}** pontos, jogando **${userData.plays.integerValue}** vezes.`;
  } else {
    rankingString += `\n\n Enquanto você, <@${userId}> , **não tem ponto nenhum** :(`;
  }
  return rankingString;
}

async function generalCommands(message, splitMessage) {
  const deninhoReact = '777326021007245323';
  const username = message.author.username;
  const userId = message.author.id;

  if (message.content == 'bom dia' || message.content == 'dia') {
    message.reply(`Bom Dia!`);
    message.react(deninhoReact);
  } else if (message.content == 'boa noite' || message.content == 'noite') {
    message.reply(`Boa Noite!`);
    message.react(deninhoReact);
  } else if (message.content == 'boas festas') {
    message.reply(`Boas Festas!`);
    message.react(deninhoReact);
  } else if (splitMessage[0] == '*eita') {
    eitaCounter++;
    message.reply(`A Lexyca já falou eita ${eitaCounter} vezes`);
    message.react(deninhoReact);
  } else if (splitMessage[0] == '*caraio') {
    caraioCounter++;
    message.reply(`A Pachi já falou caraio ${caraioCounter} vezes`);
    message.react(deninhoReact);
  } else if (splitMessage[0] == '*alfa') {
    panificadoraAlfaCounter++;
    message.reply(
      `Já escutamos Panificadora Alfa ${panificadoraAlfaCounter} vezes`,
    );
    message.react(deninhoReact);
  } else if (splitMessage[0] == '*splash') {
    message.reply('Splash Splash');
    message.react(deninhoReact);
  } else if (splitMessage[0] == '*selvagem') {
    message.reply(
      'Vá na live do pokemao dar o seu !selvagem https://twitch.tv/pokemaobr',
    );
    message.react(deninhoReact);
  } else if (splitMessage[0] == '*capturar') {
    message.reply(
      'Vá na live do pokemao dar o seu !capturar https://twitch.tv/pokemaobr',
    );
    message.react(deninhoReact);
  } else if (splitMessage[0] == '*selva') {
    message.reply(
      'Vá na live do pokemao dar o seu !selva https://twitch.tv/pokemaobr',
    );
    message.react(deninhoReact);
  } else if (splitMessage[0] == '*amor') {
    message.reply('Amor!', { files: ['./img/pachiLuv.png'] });
    message.react(deninhoReact);
  } else if (splitMessage[0] == '*cancelar') {
    cancelamentosBrute = fs.readFileSync('cancelamentos.txt', 'utf8');
    cancelamentos = cancelamentosBrute.split('\n');

    var cancelamento =
      cancelamentos[Math.floor(Math.random() * cancelamentos.length)];

    if (splitMessage[1]) {
      message.reply(`cancelou ${splitMessage[1]} por ${cancelamento}`);
    } else {
      message.reply(`cancelou o mundo por ${cancelamento}`);
    }
  } else if (splitMessage[0] == '*padrao') {
    if (splitMessage[1]) {
      const standard = splitMessage[1].toLowerCase();
      const channel = message.channel.name;
      fs.writeFileSync(`padrao-${channel}.txt`, standard);
      message.delete();
    }
  } else if (splitMessage[0] == '*vergonha') {
    try {
      const breakersBrute = fs.readFileSync('breakers.txt', 'utf8');
      const breakersLine = breakersBrute.split('\n');
      breakersMessage = '';

      breakersLine.forEach((breaker) => {
        if (breaker != '') {
          breakerData = breaker.split(',');

          breakersMessage += `\n${breakerData[0]} quebrou o padrão ${breakerData[1]} vezes`;
        }
      });

      message.reply(breakersMessage);
    } catch (err) {}
  } else if (splitMessage[0] == '*clap') {
    userClapped = splitMessage[1];

    message.delete();
    message.channel.send(`${userClapped} CLAP`, { files: ['img/clap.gif'] });
  } else if (splitMessage[0] == '*spin') {
    //Retorna se tiver um spin em andamento
    if (block) {
      message.reply(`Parabéns, é spam <:${spinOptions[3]}>`);
      return;
    } else if (
      message.channel.name.includes('cassino') ||
      message.channel.name.includes('teste-bot')
    ) {
      let sorteados = [];
      block = true;

      for (let i = 0; i < 3; i++) {
        let sorteado =
          spinOptions[Math.floor(Math.random() * spinOptions.length)];
        sorteados.push(sorteado);
      }

      let msg = await message.channel.send(
        `${emojiPadrao} ${emojiPadrao} ${emojiPadrao}`,
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

          salvarPontos(username, 100);
        } else {
          message.reply(`Parabéns você perdeu`);

          salvarPontos(username, 0);
        }
        block = false;
      }, 3500);
    }
  } else if (splitMessage[0] == '*roll') {
    if (
      message.channel.name.includes('cassino') ||
      message.channel.name.includes('teste-bot')
    ) {
      const randomNumber = Math.random() * 100;
      const formatNumber = new Intl.NumberFormat('pt-BR', {
        maximumSignificantDigits: 2,
      }).format(randomNumber);
      console.log(randomNumber)
      if (randomNumber >= 100) {
        message.reply(
          `Você tirou ${formatNumber}, Parabéns, Você ganhou com pontos elevados!`,
        );
        salvarPontos(username, 150);
      } else if (randomNumber >= 95) {
        message.reply(`Você tirou ${formatNumber}, Parabéns, Você ganhou!`);
        salvarPontos(username, 10);
      } else {
        message.reply(`Você tirou ${formatNumber}, Parabéns, Você perdeu!`);
        salvarPontos(username, 0);
      }
    }
  } else if (splitMessage[0] == '*rank') {
    if (
      message.channel.name.includes('cassino') ||
      message.channel.name.includes('teste-bot')
    ) {
      let msg = await verRanking(username, userId);
      message.channel.send(msg);
    }
  }
}

function executeStandard(message) {
  try {
    const channel = message.channel.name;
    const standard = fs
      .readFileSync(`padrao-${channel}.txt`, 'utf8')
      .toLowerCase();

    messageSplited = message.content.split(' ');

    if (
      message.content != standard &&
      standard != '' &&
      messageSplited[0] != '*padrao'
    ) {
      message.reply(
        'Você não seguiu o padrão! Adicionando mais uma quebra de padrão á sua ficha!',
      );

      fs.writeFileSync(`padrao-${channel}.txt`, '');

      try {
        const username = message.author.username;
        const breakersBrute = fs.readFileSync('breakers.txt', 'utf8');
        const breakersLine = breakersBrute.split('\n');
        const breakers = [];

        breakersLine.forEach((breaker) => {
          breakers.push(breaker.split(','));
        });

        const index = findBreaker(breakers, username);

        if (index != -1) {
          const userData = breakers[index];
          const username = userData[0];
          const breaks = Number(userData[1]);

          const content = breakersBrute.replace(
            `${username},${breaks}`,
            `${username},${breaks + 1}`,
          );

          fs.writeFileSync('breakers.txt', content);
        } else {
          fs.appendFileSync('breakers.txt', `${username},1\n`);
        }
      } catch (err) {}
    }
  } catch (err) {}
}

function findBreaker(breakers, username) {
  for (i = 0; i < breakers.length; i++) {
    if (breakers[i][0] == username) {
      return i;
    }
  }
  return -1;
}
