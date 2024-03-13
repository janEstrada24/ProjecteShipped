require("dotenv").config();
const { Client } = require('pg');

const client = new Client ({
    host: process.env.HOST_DATABASE,
    user: process.env.USER_DATABASE,
    port: process.env.PORT_DATABASE,
    password: process.env.PASSWORD_DATABASE,
    database: process.env.DATABASE
});

module.exports = client;