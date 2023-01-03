const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config.js');

const commands = [];
const commandFiles = fs.readdirSync('./commands').forEach(dir => {
    const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(f => f.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${dir}/${file}`);
        commands.push(command.data.toJSON());
    }
})

const rest = new REST({ version: '9' }).setToken(config.bot.token);

(async() => {
    try {
        console.log('Se inició el registro de slash commands.');

        await rest.put(
            Routes.applicationCommands(config.bot.id, config.guild.id), { body: commands },
        );
        console.log('Se registraron slash commands correctamente. Iniciando el bot');
        require('./index.js')
    } catch (error) {
        console.error(error);
    }
})();