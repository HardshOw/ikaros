const commando = require('discord.js-commando');

module.exports = class Age extends commando.Command {
  constructor(client) {
    super(client, {
		name: 'age',
		group: 'admin',
		memberName: 'age',
		description: 'Check Members Age',
		details: 'Needs one int parameter for work correctly'
    });
  }

	async run(msg, args){
		if (msg.member.roles.find("name", "Membre") != undefined)
		{
			msg.reply("Te fous pas de la gueule des Nekos")
			return ;
		}
		if (checkAgeChar(args) == 1){
			if (args >= 0 && args <= 17){
					msg.channel.send("Neko-Lulu pas contente, Neko pas accepter toi! Entrée au paradis refusée!");
					msg.member.ban("Trop jeune");
			}
			else if (args >= 85)
				msg.reply("Désolée nous n'acceptons que les personnes en condition physique pour pouvoir se Fap, Next.");
			else{
				msg.channel.send(" Neko-Lulu contente, Neko accepter toi dans son monde!");
				msg.member.addRole(msg.guild.roles.find("name", "Membre"));
				sendRules(msg);
			}
			}
			else
				msg.reply("Rentrez un age valide merci");
 		}
	}

function checkAgeChar (age){
  let i = 0;

  while (i < age.length){
    if (age.charCodeAt(i) <= 47 || age.charCodeAt(i) >= 58)
      return 0;
    i++;
  }
  return 1;
}

function sendRules (msg){
	msg.member.send(`Bonjour et bienvenue a toi, jeune pervers(e) :heart:.
Tu viens d'arriver sur le serveur Hentai Univers et je suis la pour t'aider.
Je t'invite à aller lire la charte située dans le channel #charte du serveur pour être au
courant des règles a respecter ici ^^ pense aussi a vérifier les messages épinglés,
ils contiennent des infos utiles !
Sur ce, je te laisse découvrir le monde du Hentai et sa communauté sur le serveur :heart:`);
}
