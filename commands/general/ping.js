exports.run = async (client, message, args) => {
  message.channel.send("Pong!");
};

exports.help = {
  name: "ping",
  description: "Check if the bot was online.",
  usage: "!ping",
  example: "!ping"
};

exports.conf = {
  aliases: [],
  cooldown: 5 // Integer = second.
};
