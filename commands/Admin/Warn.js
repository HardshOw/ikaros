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
		console.log(args.reason);
		if (!args.reason) {
			console.log('on affiche les infos');
			try {
				let value = await client.warnTable.get(args.member.id);
				warnTab = JSON.parse(value);
				msg.reply(`Ci-dessou le(s) warn(s) de l'utilisateur <@${args.member.id}> :`);
				for (var i = 0; i < warnTab.length; i++) {
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
									name: `Warn No° ${i}`
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
				console.log(err);
				msg.reply(`L'utilisateur <@${args.member.id}> n'as recu aucun warn pour le moment.`);
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
				msg.channel.send({
					embed: {
						color: 0xc75a4d,
						author: {
							name: "Ikaros",
						},
						title: "Warn :",
						description: `L'utilisateur ${args.member.username} s'st fait warn.`,
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
				})
			}catch(err){
				if (err.notFound) {
					console.log('Row not found, insert one');
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
					msg.channel.send({
						embed: {
							color: 0xc75a4d,
							author: {
								name: "Ikaros",
							},
							title: "Warn :",
							description: `L'utilisateur ${args.member.username} s'st fait warn.`,
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
					})
				}
			}
		}

	}
}
