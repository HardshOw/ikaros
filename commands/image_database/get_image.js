const commando = require('discord.js-commando');

module.exports = class getImage extends commando.Command{
	constructor(client) {
		super(client, {
			name: 'getimage',
			group: 'admin',
			memberName: 'getimage',
			description: 'Get images from Ikaros server and put URL in file'
		});
	}

}
