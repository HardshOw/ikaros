const commando = require('discord.js-commando');
const db = require('../../ban.json')

module.exports = class Ban extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'ban',
			group: 'admin',
			memberName: 'ban',
			description: 'Ban users',
			details: 'Ban user for heavy fault',
			args:
			[
				{
					key: 'member',
					prompt: 'The user wich will be ban.',
					type: 'user'
				},
				{
					key: 'reason',
					prompt: 'The specific reason of this ban.',
					type: 'string',
					default: ''
				}
			]
		});
 	}

	async run(msg, args){
	if (checkPerm(msg, "Mastermodo") == 0 && checkPerm(msg, "Supermodo") == 0 && checkPerm(msg, "Modo") == 0){
		msg.reply("Vous n'êtes pas autorisé a éxécuter cette commande");
		return ;
	}
	let banTable = [];
	const client = msg.client;
	if (!args.reason){
		try{
			let value = await client.banTable.get(args.member.id);
			banTable = JSON.parse(value);
			if (banTable.length === 0){
				msg.reply(`L'utilisateur <@${args.member.id}> n'a pas été banni du serveur`);
				return
			}
			msg.reply("L'utilisateur a été banni du serveur, voici le log du ban, My Master")
			msg.channel.send({
				embed: {
					color: 0xc75a4d,
					author: {
						name: "Ikaros",
					},
					title: "Ban :",
					description: `L'utilisateur <@${args.member.id}> a été banni`,
					fields: [
						{
							name: "Auteur :",
							value: `<@${banTable[i].banAuthor.id}>`
						},
						{
							name: "Motif :",
							value: banTable[i].banReason
						}
					],
					timestamp: banTable[i].date,
					footer: {
						text: "© Ikaros, Hentai Univers"
					}
				}
			});
		}
		catch (err){
			msg.reply(`L'utilisateur <@${args.member.id}> n\'a pas été banni du serveur`)
		}
	}
	else{
		try {
			let value = await client.banTable.get(args.member.id);
			banTable = JSON.parse(value);
			banTable.push(
				{
					banAuthor: msg.author,
					banReason: args.reason,
					date: new Date()
				}
			);
		var cache = [];
		await client.banTable.put(args.member.id, JSON.stringify(banTable, function(key, value) {
			if (typeof value === 'object' && value !== null) {
				if (cache.indexOf(value) !== -1) {
					// Circular reference found, discard key
					return;
				}
				// Store value in our collection
				cache.push(value);
			}
			return value;
		}));
		cache = NULL;
		const embedMessageStaff = {
			embed: {
				color: 0xc75a4d,
				author: {
					name: "Ikaros",
				},
				title: "Ban :",
				description: `L'utilisateur ${args.member.username} a été banni`,
				fields: [
					{
						name: "Auteur :",
						value: msg.author.username
					},
					{
						name: "Motif :",
						value: args.reason
					}
				],
				timestamp: new Date(),
				footer: {
					text: "© Ikaros, Hentai Univers"
				}
			}
		}

		const embedMessageUser = {
			embed: {
				color: 0xc75a4d,
				author: {
					name: "Ikaros",
				},
				title: "Ban",
				description: ' ',
				fields: [
					{
						name: "Motif :",
						value: args.reason
					}
				],
				timestamp: new Date(),
				footer: {
					text: "© Ikaros, Hentai Univers"
				}
			}
		}
		await args.member.send(embedMessageUser);
		msg.guild.ban(args.member.id);
		msg.channel.send(embedMessageStaff)
		}
		catch(err){
			if (err.notFound) {
				banTable.push(
					{
						banAuthor: msg.author,
						banReason: args.reason,
						date: new Date()
					}
				);
				var cache = [];
				await client.banTable.put(args.member.id, JSON.stringify(banTable, function(key, value) {
					if (typeof value === 'object' && value !== null) {
						if (cache.indexOf(value) !== -1) {
							// Circular reference found, discard key
							return;
						}
						// Store value in our collection
						cache.push(value);
					}
					return value;
				}));
				cache =null;
				const embedMessageStaff = {
					embed: {
						color: 0xc75a4d,
						author: {
							name: "Ikaros",
						},
						title: "Ban :",
						description: `L'utilisateur ${args.member.username} s'est fait ban.`,
						fields: [
							{
								name: "Auteur :",
								value: msg.author.username
							},
							{
								name: "Motif :",
								value: args.reason
							}
						],
						timestamp: new Date(),
						footer: {
							text: "© Ikaros, Hentai Univers"
						}
					}
				}

				const embedMessageUser = {
					embed: {
						color: 0xc75a4d,
						author: {
							name: "Ikaros",
						},
						title: "Ban",
						description: ' ',
						fields: [
							{
								name: "Motif :",
								value: args.reason
							}
						],
						timestamp: new Date(),
						footer: {
							text: "© Ikaros, Hentai Univers"
						}
					}
				}
				await args.member.send(embedMessageUser);
				msg.guild.ban(args.member.id);
				msg.channel.send(embedMessageStaff)
			}
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
