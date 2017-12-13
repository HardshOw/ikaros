const Commando = require('discord.js-commando');

const client = new Commando.Client({
	owner: '298920630043148288',
	commandPrefix: '?ik',
	unknownCommandResponse: false,
	disableEveryone: true
});

const path = require('path');

client.registry
.registerDefaultTypes()
.registerGroups([
	['test', 'Test'],
])

.registerCommandsIn(path.join(__dirname, 'commands'));

client.login(TOKEN);
