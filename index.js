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

client.registry
.registerDefaultTypes()
.registerGroups([
	['test', 'Test'],
	['admin', 'Admin'],
])

.registerCommandsIn(path.join(__dirname, 'commands'));

client.login(logs.TOKEN);
