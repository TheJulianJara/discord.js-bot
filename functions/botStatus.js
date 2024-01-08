const { ActivityType } = require('discord.js');

async function setStatus(client) {
    await client.user.setPresence({
        activities: [{
            name: `desarrollarse`,
            type: ActivityType.PLAYING,
        }],
        status: "idle"
    });
}

module.exports = setStatus;