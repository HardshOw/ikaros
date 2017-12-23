const commando = require('discord.js-commando');

module.exports = class Role extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'role',
			group: 'role',
			memberName: 'role',
			description: 'Role command',
			args: [
				{
					key: 'property',
					prompt: 'Wich type of role command',
					type: 'string',
					default: ''
				},
				{
					key: 'role',
					prompt: 'The role to del',
					type: 'string',
					default: ''
				}
			]
		});
	}

	async run(msg, args){
		if (args.property && args.role){
			if (args.property == "get"){
				getRole(msg, args);
				return ;
			}
			else if (args.property == "remove"){
				remRole(msg, args);
				return ;
			}
			else if (args.property == "add"){
				if (checkPerm(msg, "Mastermodo") == 0 && checkPerm(msg, "Supermodo") == 0 && checkPerm(msg, "Modo") == 0){
					msg.reply("Vous n'êtes pas autorisé a éxécuter cette commande");
					return ;
				}
				addRole(msg, args);
				return ;
			}
			else if (args.property == "delete"){
				if (checkPerm(msg, "Mastermodo") == 0 && checkPerm(msg, "Supermodo") == 0 && checkPerm(msg, "Modo") == 0){
					msg.reply("Vous n'êtes pas autorisé a éxécuter cette commande");
					return ;
				}
				delRole(msg, args);
				return ;
			}
			else{
				errorMessage(msg, args);
				return ;
			}
		}
		else if (!args.property && !args.role){
			getRoleList(msg, args);
			return ;
		}
		else{
			errorMessage(msg, args);
			return ;
		}
	}
}

function errorMessage(msg, args){
	let string = "```";

	string += "Voici les commandes que vous pouvez utiliser, My Master :\n- ?role get \"Nom du role\"\n- ?role remove \"Nom du role\"\n";
	if (checkPerm(msg, "Mastermodo") == 1 || checkPerm(msg, "Supermodo") == 1 || checkPerm(msg, "Modo") == 1){
		string += "- ?role add \"Nom du role\" (créé le role)\n- ?role delete \"Nom du role\" (supprime le role)";
	}
	string += "```";
	msg.channel.send(string);
}

function addRole(msg, args){
	if (msg.guild.roles.find('name', args.role) != undefined){
		msg.channel.send("```Ce role existe déja```");
		return ;
	}
	msg.guild.createRole({
		name : args.role,
		color: [149, 240, 178],
	});
	msg.channel.send("```Role créé ```");
}

function getRole(msg, args){
	if (!args.role.startsWith("Fan")){
		msg.channel.send(`Vous n'avez pas a vous assigner ce role, ${msg.member.user.username}`);
		return ;
	}
	if (msg.guild.roles.find('name', args.role) == undefined){
		msg.channel.send("```Ce role n'existe pas ou n'est pas assignable```");
		return ;
	}
	let id = msg.guild.roles.find('name', args.role);
	msg.member.addRole(id);
	msg.channel.send("```Role attribué```");
}

function delRole(msg, args){
	if (msg.guild.roles.find('name', args.role) == undefined){
		msg.channel.send("```Ce role n'existe pas```");
		return ;
	}
	let role = msg.guild.roles.find('name', args.role);
	role.delete();
	msg.channel.send("```Role supprimé```");
}

function remRole(msg, args){
	if (!args.role.startsWith("Fan")){
		msg.channel.send(`Vous n'avez pas a vous retirer ce role, ${msg.member.user.username}`);
		return ;
	}
	if (msg.member.roles.find('name', args.role) == undefined){
		msg.channel.send("```Vous ne possèdez pas ce role```");
		return ;
	}
	let id = msg.guild.roles.find('name', args.role);
	msg.member.removeRole(id);
	msg.channel.send("```Role retiré```");
}

function getRoleList(msg, args){
	let listRole = [];
	let stringRole = "```Voici la liste des roles auto-assignables\n";

	msg.channel.guild.roles.map(function(value){
		if (value.name.startsWith('Fan')){
			listRole.push(value.name);
		}
	});
	for (let i = 0; i < listRole.length; i++){
		stringRole += listRole[i] + '\n';
	}
	stringRole += "```";
	msg.channel.send(stringRole);
}

function checkPerm(msg, args)
{
	if (msg.member.roles.find('name', args) != undefined)
		return 1;
	return 0;
}
