const mongoose = require('mongoose');
const config = require('../config.js');

async function connectionDB(client) {
    await mongoose.connect(config.db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        client.logger.log(`Conectado a la base de datos ${mongoose.connection.name}`, "db");
    }).catch((err) => {
        client.logger.log(`Ha ocurrido un error al tratar de conectar a la base de datos.\n${err}`, "error");
    });
}

module.exports = connectionDB;