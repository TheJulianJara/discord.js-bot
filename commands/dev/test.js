const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'test',
    category: 'Dev',
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Comando de prueba.'),
    async execute(interaction) {
        await interaction.reply({ content: 'Test', ephemeral: true });
    }
};