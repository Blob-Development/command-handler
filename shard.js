// Use this only when your bot reached 2.000 servers.

const {ShardingManager} = require("discord.js");
require('dotenv').config();

const shards = new ShardingManager("./server.js", {
  token: process.env.SECRET,
  totalShards: "auto",
  respawn: true,
	execArgv: ['--trace-warnings'],
	shardArgs: ['--ansi', '--color']
});

shards.on("shardCreate", shard => {
  console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launched shard #${shard.id}`)
});

shards.spawn(shards.totalShards, 15000, Infinity);

// Read more: https://discordjs.guide/sharding
