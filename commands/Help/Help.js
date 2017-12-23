const commando = require('discord.js-commando');

module.exports = class Help extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'help',
			group: 'help',
			memberName: 'help',
			description: 'Help command, showing all available commands.',
			details: "Will show available commands depending to your roles and permissions.",
			args:
			[
				{
					key: 'module',
					prompt: 'The user wich will be warn.',
					type: 'string',
					default: ''
				},
			]
		});
 	}


	async run(msg, args){

		const client = msg.client;

		if (args.module) {

			if (args.module === 'Admin') {

				if (checkPerm(msg, "Mastermodo") == 0 && checkPerm(msg, "Supermodo") == 0 && checkPerm(msg, "Modo") == 0 && checkPerm(msg, "Modo étagères <3") == 0){

					msg.reply("Vous n'avez pas acces à ce module.");
					return;

				}else {
					const module = client.registry.groups.find('name', args.module);
					msg.channel.send(`Voici la liste de toute les commandes dont vous avez accès :`);
					module.forEach(function(value, key, map) {

						msg.channel.send({
							embed: {
								color: 0xc75a4d,
								author: {
									name: `Module : ${args.module}`,
								},
								title: `Nom de la commande : ${value.name}`,
								fields: [
									{
										name: 'Description:',
										value: `${value.desription}`
									},
									{
										name: "Detail :",
										value: `${value.details}`
									},
									{
										name: "Exemple :",
										value: warnTab[i].banReason
									}
								],
								footer: {
									text: "© Ikaros, Hentai Univers"
								}
							}
						})
					});
				}
			}else {
				console.log(client.registry.groups);
				const module = client.registry.groups.find('name', args.module);
				msg.channel.send(`Voici la liste de toute les commandes dont vous avez accès :`);
				module.forEach(function(value, key, map) {

					msg.channel.send({
						embed: {
							color: 0xc75a4d,
							author: {
								name: `Module : ${args.module}`,
							},
							title: `Nom de la commande : ${value.name}`,
							fields: [
								{
									name: 'Description:',
									value: `${value.desription}`
								},
								{
									name: "Detail :",
									value: `${value.details}`
								},
								{
									name: "Exemple :",
									value: warnTab[i].banReason
								}
							],
							footer: {
								text: "© Ikaros, Hentai Univers"
							}
						}
					})
				});

			}
		}else {
			if (checkPerm(msg, "Mastermodo") == 0 && checkPerm(msg, "Supermodo") == 0 && checkPerm(msg, "Modo") == 0 && checkPerm(msg, "Modo étagères <3") == 0){
				//Je montre les modules autorisés aux membres.
				const exCommand = "`?help <module>`";
				msg.channel.send(`Voici la liste detout les modules dont vous avez accès.
Utilisez la commande ${exCommand} pour voir les commandes du module souhaité.`);
				client.registry.groups.forEach(function(value, key, map) {

					if (value.name != 'Admin') {

						msg.channel.send({
							embed: {
								color: 0xc75a4d,
								author: {
									name: "Nom du module :",
								},
								title: value.name,
							}
						})
					}
				});

			}else {
				//Je montre tout les modules
				const exCommand = "`?help <module>`";
				msg.channel.send(`Voici la liste detout les modules dont vous avez accès.
Utilisez la commande ${exCommand} pour voir les commandes du module souhaité.`);
				client.registry.groups.forEach(function(value, key, map) {

						msg.channel.send({
							embed: {
								color: 0xc75a4d,
								author: {
									name: "Nom du module :",
								},
								title: value.name,
							}
						})
				});

			}
		}

	}
}

function checkPerm(msg, args)
{
	if (msg.member.roles.find('name', args) != undefined)
		return 1;
	return 0;
}
