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
    console.log(message);
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
    if (
      message.channel.name.includes('premiun') ||
      message.channel.name.includes('chat')
    ) {
      cancelamentosBrute = fs.readFileSync('cancelamentos.txt', 'utf8');
      console.log(cancelamentosBrute);
      cancelamentos = cancelamentosBrute.split('\n');

      var cancelamento =
        cancelamentos[Math.floor(Math.random() * cancelamentos.length)];

      if (splitMessage[1]) {
        message.reply(`cancelou ${splitMessage[1]} por ${cancelamento}`);
      } else {
        message.reply(`cancelou o mundo por ${cancelamento}`);
      }
    }
  }
}
