require("dotenv").config();
const { Client } = require('pg');

/*const client = new Client ({
    host: process.env.HOST_DATABASE,
    user: process.env.USER_DATABASE,
    port: process.env.PORT_DATABASE,
    password: process.env.PASSWORD_DATABASE,
    database: process.env.DATABASE
});*/
const client = new Client ({
    host: "localhost",
    user: "admin",
    port: "5432",
    password: "8*U9l9",
    database: "admin"
});

module.exports = client;