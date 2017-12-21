const commando = require('discord.js-commando');
const db = require('../../warn.json')

module.exports = class Age extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'warn',
			group: 'admin',
			memberName: 'warn',
			description: 'Warn users',
			details: 'Each users got 3 chances before get ban.',
			userPermissions: ['BAN_MEMBERS'],
			args:
			[
				{
					key: 'member',
					prompt: 'The user wich will be warn.',
					type: 'user'
				},
				{
					key: 'reason',
					prompt: 'The specific reason of this warn.',
					type: 'string',
					default: ''
				}
			]
		});
 	}

	async run(msg, args){
		let warnTab = [];
		const client = msg.client;
		if (!args.reason) {
			try {
				let value = await client.warnTable.get(args.member.id);
				warnTab = JSON.parse(value);
				if (warnTab.length === 0) {
					msg.reply(`L'utilisateur <@${args.member.id}> n'as pas de warn pour le moment.`);
					return
				}
				msg.reply(`Ci-dessou le(s) warn(s) de l'utilisateur <@${args.member.id}> :`);
				for (let i = 0; i < warnTab.length; i++) {
					msg.channel.send({
						embed: {
							color: 0xc75a4d,
							author: {
								name: "Ikaros",
							},
							title: "Warn :",
							description: `L'utilisateur ${args.member.username} s'est fait warn.`,
							fields: [
								{
									name: 'Warn No°',
									value: `${i}`
								},
								{
									name: "Auteur :",
									value: `<@${warnTab[i].banAuthor.id}>`
								},
								{
									name: "Motif :",
									value: warnTab[i].banReason
								}
							],
							timestamp: warnTab[i].date,
							footer: {
								text: "© Ikaros, Hentai Univers"
							}
						}
					})
				}
			} catch (err) {
				msg.reply(`L'utilisateur <@${args.member.id}> n'as pas de warn pour le moment.`);
			}
		}else {

			try{
				let value = await client.warnTable.get(args.member.id);
				warnTab = JSON.parse(value);
				warnTab.push(
					{
						banAuthor: msg.author,
						banReason: args.reason,
						date: new Date()
					}
				);
				var cache = [];
				await client.warnTable.put(args.member.id, JSON.stringify(warnTab, function(key, value) {
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
				cache = null;
				const embedMessageStaff = {
					embed: {
						color: 0xc75a4d,
						author: {
							name: "Ikaros",
						},
						title: "Warn :",
						description: `L'utilisateur ${args.member.username} s'est fait warn.`,
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
						title: "Warn",
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
				args.member.sendMessage(`Vous êtes un(e) vilain (e) pervers(e), vous venez d'avoir un warn attention il vous en reste  ${3 - warnTab.length} avant de vous faire ban! Soyez sage!`);
				args.member.sendMessage(embedMessageUser);
				msg.channel.send(embedMessageStaff)
				if (warnTab.length >= 3) {
					msg.channel.send('Cet utilisateur vas se fair ban ...');
				}
			}catch(err){
				if (err.notFound) {
					warnTab.push(
						{
							banAuthor: msg.author,
							banReason: args.reason,
							date: new Date()
						}
					);
					var cache = [];
					await client.warnTable.put(args.member.id, JSON.stringify(warnTab, function(key, value) {
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
							title: "Warn :",
							description: `L'utilisateur ${args.member.username} s'est fait warn.`,
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
							title: "Warn",
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
					args.member.sendMessage(`Vous êtes un(e) vilain (e) pervers(e), vous venez d'avoir un warn attention il vous en reste  ${3 - warnTab.length} avant de vous faire ban! Soyez sage!`);
					args.member.sendMessage(embedMessageUser);
					msg.channel.send(embedMessageStaff)
				}
			}
		}

	}
}
