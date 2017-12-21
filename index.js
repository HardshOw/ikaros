const Commando = require('discord.js-commando');
const logs = require('./logs.json')
const path = require('path');
const levelup = require('levelup')
const leveldown = require('leveldown')

const client = new Commando.Client({
	owner: logs.OWNER,
	commandPrefix: '?',
	unknownCommandResponse: false,
	disableEveryone: true
});

client.warnTable = levelup(leveldown('./warnTable'))
client.banTable = levelup(leveldown('./banTable'))

client.registry
.registerDefaultTypes()
.registerGroups([
	['test', 'Test'],
	['admin', 'Admin'],
	['member', 'Membre'],
])

.registerCommandsIn(path.join(__dirname, 'commands'));

client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.find('name', 'hall_d_entree');
	if (!channel)
		return ;
	channel.send(`Bonjour <@${member.id}> sur le serveur Hentai Univers, je t\'invite a nous indiquer ton age avec la commande \?age \"ton_age\" avant de recevoir plus d\'informations ˆˆ`);
});

client.login(logs.TOKEN);
