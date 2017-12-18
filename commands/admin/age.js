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
    if (checkAgeChar(args) == 1){
      if (args >= 0 && args <= 17)
        msg.channel.send("DEAD END");
      else if (args >= 85)
        msg.reply("Te fous pas de moi, jeune Padawan");
      else{
        msg.channel.send("HAPPY END");
        msg.member.addRole(msg.guild.roles.find("name", "Membre"));
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
