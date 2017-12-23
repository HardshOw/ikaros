const Commando = require('discord.js-commando');
const path = require('path');
const levelup = require('levelup')
const leveldown = require('leveldown')
const logs = require('./logs.json')

const client = new Commando.Client({
	owner: logs.OWNER,
	commandPrefix: '?',
	unknownCommandResponse: false,
	disableEveryone: true
});

client.warnTable = levelup(leveldown('./warnTable'))

client.registry
.registerDefaultTypes()
.registerGroups([
	['test', 'Test'],
	['admin', 'Admin'],
	['help', 'Help'],
	['member', 'Membre'],
])

.registerCommandsIn(path.join(__dirname, 'commands'));

client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.find('name', 'hall_d_entree');
	if (!channel)
		return ;
		const command = '```?age 16```'
		channel.send(
			`Bonjour <@${member.id}> sur le serveur Hentai Univers !
Je t'invite a nous indiquer ton age avec la commande suivante avant de recevoir plus d'informations.
Exemple :
${command}
Si tu as 16 ans.`);
});

client.login(logs.TOKEN);
