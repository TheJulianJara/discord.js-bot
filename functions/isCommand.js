async function isCommand(client, interaction) {
    if (interaction.isCommand()) {
        const slashcmd = client.slashcommands.get(interaction.commandName);
        if (!interaction.guild) return interaction.reply('Por el momento, no se encuentran disponibles los comandos de slash en los mensajes privados.');
        if (!slashcmd) return;
        try {
            slashcmd.execute(interaction, client);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Ocurrió un error interno. Intenta nuevamente!', ephemeral: true });
        }
    }
}

module.exports = isCommand;