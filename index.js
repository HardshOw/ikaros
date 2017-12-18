const Commando = require('discord.js-commando');
const token = require('./token.json')

const client = new Commando.Client({
	owner: '298920630043148288',
	commandPrefix: '?',
	unknownCommandResponse: false,
	disableEveryone: true
});

const path = require('path');

client.registry
.registerDefaultTypes()
.registerGroups([
	['test', 'Test'],
	['admin', 'Admin'],
])

.registerCommandsIn(path.join(__dirname, 'commands'));

client.login(token.TOKEN);
