const isCommand = require('../../functions/isCommand.js');

module.exports = async(client, interaction) => {
    return isCommand(client, interaction);
}