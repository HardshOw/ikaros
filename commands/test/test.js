const commando = require('discord.js-commando');

module.exports = class Test extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'test',
			group: 'test',
			memberName: 'test',
			description: 'Adds numbers together.',
			details:`
				This is an incredibly useful command that finds the sum of numbers.
				This command is the envy of all other commands.
			`
		});
	}

	async run(msg, args) {
		msg.reply('Test command')
	}
};
