require('dotenv').config();
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

  if (message.content == 'bom dia' || message.content == 'dia') {
    message.reply(`Bom Dia!`);
  } else if (message.content == 'boa noite' || message.content == 'noite') {
    message.reply(`Boa Noite!`);
  } else if (message.content == 'boas festas') {
    message.reply(`Boas Festas!`);
  } else if (splitMessage[0] == '*eita') {
    eitaCounter++;
    message.reply(`A Lexyca já falou eita ${eitaCounter} vezes`);
  } else if (splitMessage[0] == '*caraio') {
    caraioCounter++;
    message.reply(`A Pachi já falou caraio ${caraioCounter} vezes`);
  } else if (splitMessage[0] == '*alfa') {
    panificadoraAlfaCounter++;
    message.reply(
      `Já escutamos Panificadora Alfa ${panificadoraAlfaCounter} vezes`,
    );
  } else if (splitMessage[0] == '*splash') {
    message.reply('Splash Splash');
  } else if (splitMessage[0] == '*selvagem') {
    message.reply(
      'Vá na live do pokemao dar o seu !selvagem https://twitch.tv/pokemaobr',
    );
  } else if (splitMessage[0] == '*capturar') {
    message.reply(
      'Vá na live do pokemao dar o seu !capturar https://twitch.tv/pokemaobr',
    );
  } else if (splitMessage[0] == '*selva') {
    message.reply(
      'Vá na live do pokemao dar o seu !selva https://twitch.tv/pokemaobr',
    );
  }
});
