const connectionDB = require("../../functions/connectionDB.js");
const setStatus = require("../../functions/botStatus.js");

module.exports = async(client) => {
    await connectionDB(client)
    await setStatus(client)
    await client.logger.log(`Bot iniciado correctamente como ${client.user.tag}!`, "ready");

}