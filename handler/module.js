const Discord = require("discord.js"),
      fs = require("fs");

// Please be careful, this code will makes you confusing and it will risks an error if you don't try to focus it.

module.exports = client => {
  client.commands = new Discord.Collection();
  client.aliases = new Discord.Collection();
  client.helps = new Discord.Collection();
  
  fs.readdir("./commands/", (err, categories) => {
    if (err) console.log(err) // it will send you an error, if there was something went wrong.
    console.log(`Found total ${categories.length} categories.`);
    
    categories.forEach(category => {
      let moduleConf = require(`../commands/${category}/module.json`);
      moduleConf.path = `./commands/${category}`;
      moduleConf.cmds = [];
      if (!moduleConf) return; // If there was no module.json in the folder, return.
      client.helps.set(category, moduleConf);
      
      fs.readdir(`./commands/${category}`, (err, files) => {
        // Example: Found total 19 command(s) from admin.
        console.log(`Found total ${files.length - 1} command(s) from ${category}.`);
        if (err) console.log(err);
        let commands = new Array();
        
        files.forEach(file => {
          if (!file.endsWith(".js")) return; // If the file wasn't ended with .js, ignore it.
          let prop = require(`../commands/${category}/${file}`);
          let cmdName = file.split(".")[0];
          
          client.commands.set(prop.help.name, prop)
          
          prop.conf.aliases.forEach(alias => {
            client.aliases.set(alias, prop.help.name);
          })
          
          client.helps.get(category).cmds.push(prop.help.name);
          // This will push the data into Collection, which is includes name of the file, aliases, and many.
        })
      })
    })
  })
}
