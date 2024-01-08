const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { readdirSync } = require('fs');

const client = new Client({
    partials: [Partials.Channel, Partials.GuildScheduledEvent, Partials.Message, Partials.GuildMember, Partials.Reaction, Partials.ThreadMember, Partials.User],
    intents: Object.keys(GatewayIntentBits).map((a)=>{
    return GatewayIntentBits[a]
  }),
})

client.slashcommands = new Collection();
client.logger = require("./utils/logger.js");
client.config = require('./config.js');
client.logger.log(`Iniciando el bot...`, "starting");
client.login(client.config.bot.token).catch(err => {
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