const Commando = require('discord.js-commando');
const token = require('./logs.json')

const client = new Commando.Client({
	owner: logs.OWNER,
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

client.login(logs.TOKEN);
