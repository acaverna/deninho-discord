require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '!'

let eitaCounter = 0
let caraioCounter = 0
let panificadoraAlfaCounter = 0

client.on('ready', () => {
  console.log(`Logged as ${client.user.tag}`);
});

client.on('message', (message) => {
  if (message.author.bot) return;

  message.content = message.content.toLowerCase()

  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(' ');
  const command = args.shift().toLowerCase();

  if (message.content == 'bom dia' || message.content == 'dia'){
    message.reply(`Bom Dia!`)
  }
  else if (message.content == 'boa noite' || message.content == 'noite'){
    message.reply(`Boa Noite!`)
  }
  else if (message.content == 'boas festas'){
    message.reply(`Boas Festas!`)
  }
  else if (command == 'eita'){
    eitaCounter++
    message.reply(`A Lexyca já falou eita ${eitaCounter} vezes`)
  }
  else if (command == 'caraio'){
    caraioCounter++
    message.reply(`A Pachi já falou caraio ${caraioCounter} vezes`)
  }
  else if (command == 'alfa'){
    panificadoraAlfaCounter++
    message.reply(`Já escutamos Panificadora Alfa ${panificadoraAlfaCounter} vezes`)
  }
  else if (command == 'splash'){
    message.reply('Splash Splash')
  }
});

client.login(process.env.TOKEN);
