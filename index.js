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

// 1) Create our store
client.warnTable = levelup(leveldown('./warnTable'))

// 2) Put a key & value
// db.put('name', 'test')
// db.get('name', function (err, value) {
// 	if (err) return console.log('Ooops!', err)
//
// 	console.log('name=' + value)
// })


client.registry
.registerDefaultTypes()
.registerGroups([
	['test', 'Test'],
	['admin', 'Admin'],
])

.registerCommandsIn(path.join(__dirname, 'commands'));

client.login(logs.TOKEN);
