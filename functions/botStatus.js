async function setStatus(client) {
    await client.user.setPresence({
        activities: [{
            name: `desarrollarse`,
            type: "PLAYING"
        }],
        status: "idle"
    });
}

module.exports = setStatus;