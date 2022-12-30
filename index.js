const { Client, Collection } = require('discord.js');
const config = require('./config.js');
const { readdirSync } = require('fs');
const client = new Client({
    restTimeOffset: 0,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],
    intents: 32767,
    disableMentions: 'everyone',
    fetchGuilds: true,
    fetchVanity: true,
    fetchAuditLogs: true,
})

client.slashcommands = new Collection();
client.logger = require("./utils/logger.js");
client.logger.log(`Iniciando el bot...`, "starting");
client.login(config.bot.token).catch(err => {
    client.logger.log(`Ha ocurrido un error al tratar de iniciar el bot.\n${err}`, "error");
})

readdirSync("./events/").forEach(dir => {
    const eventsFiles = readdirSync(`./events/${dir}/`).filter(f => f.endsWith('.js'));
    for (const file of eventsFiles) {
        const event = require(`./events/${dir}/${file}`);
        let eventName = file.split(".")[0];
        client.logger.log(`Cargando el evento ${eventName}`, "event");
        client.on(eventName, event.bind(null, client));
    }
})

readdirSync("./commands/").forEach(dir => {
    const commandFiles = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${dir}/${file}`);
        client.logger.log(`Cargando de la categoría ${command.category}, el comando slash ${command.name}`, "cmd");
        client.slashcommands.set(command.name, command);
    }
});