const Commando = require('discord.js-commando');
const path = require('path');
const levelup = require('levelup')
const leveldown = require('leveldown')

const client = new Commando.Client({
	owner: "99825469645402112",
	commandPrefix: '?',
	unknownCommandResponse: false,
	disableEveryone: true
});

client.warnTable = levelup(leveldown('./warnTable'))

client.registry
.registerDefaultTypes()
.registerGroups([
	['admin', 'Admin'],
	['help', 'Help'],
	['role', 'Role'],
])

.registerCommandsIn(path.join(__dirname, 'commands'));

client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.find('name', 'hall_d_entree');
	if (!channel)
		return ;

		const command = '```?age 16```'
		channel.send(
			`Bonjour <@${member.id}> et bienvenue sur le serveur Hentai Univers !
Je t'invite a nous indiquer ton age avec la commande suivante avant de recevoir plus d'informations.
Exemple :
${command}
Si tu as 16 ans.`);
});

client.login(process.env.BOT_TOKEN);
