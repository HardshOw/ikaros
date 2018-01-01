const Commando = require('discord.js-commando');

module.exports = class EventHandler {
	constructor(client){
		this.getDeleteMessage(client);
		this.getDeleteRole(client);
		this.getNewUser(client);
		this.userLeave(client);
		this.getNewRole(client);
	}
	getDeleteRole(client) {
		client.on('roleDelete', role => {
		const logs_channel = role.guild.channels.find('name', 'logs');
		logs_channel.send(`Le role ${role.name} a été supprimé.`);
	});
};
	getDeleteMessage(client) {
		client.on('messageDelete', message => {
		const logs_channel = message.guild.channels.find('name', 'logs');
		logs_channel.send(`Le message \`\`\`${message.content}\`\`\`\n écrit par ${message.author} a été supprimé`);
	});
};
	getNewUser(client){
	client.on('guildMemberAdd', membre => {
		const logs_channel = membre.guild.channels.find('name', 'logs');
		logs_channel.send(`Le membre <@${membre.id}> a rejoint le serveur`);
	});
};
	userLeave(client){
	client.on('guildMemberRemove', membre =>{
		const logs_channel = membre.guild.channels.find('name', 'logs');
		logs_channel.send(`Le membre <@${membre.id}> a quitté le serveur`)
	});
};
	getNewRole(client){
	client.on('roleCreate', role => {
		const logs_channel = role.guild.channels.find('name', 'logs');
		logs_channel.send(`Le role ${role.name} a été créé.`);
	});
};
}
