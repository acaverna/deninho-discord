require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.TOKEN);

let eitaCounter = 0;
let caraioCounter = 0;
let panificadoraAlfaCounter = 0;

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

function generalCommands(message, splitMessage) {
  const deninhoReact = '777326021007245323';

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
    } catch (err) {
      console.log(err);
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
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
}

function findBreaker(breakers, username) {
  for (i = 0; i < breakers.length; i++) {
    if (breakers[i][0] == username) {
      return i;
    }
  }
  return -1;
}
