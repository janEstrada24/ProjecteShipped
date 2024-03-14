const client = require("../Database/connection.js");

const getUsuarisAsc = async (req, res) => {
    try {
        const response = await client.query("SELECT * FROM usuari ORDER BY Victories ASC, Empats ASC;");
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUsuarisDesc = async (req, res) => {
    try {
        const response = await client.query("SELECT * FROM usuari ORDER BY Victories DESC, Empats DESC;");
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUsuarisAsc,
    getUsuarisDesc,
};