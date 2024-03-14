const client = require("../Database/connection.js");

const getPartidesActives = async (req, res) => {
    const values = ['activa'];
    const query = 'SELECT * FROM partides WHERE estat = $1';
    
    await client.query(query, values, (error, response) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json(response.rows);
    });
}


const getPartidesFinalitzades = async (req, res) => {
    const values = ['finalitzada'];
    const query = 'SELECT * FROM partides WHERE estat = $1';
    
    await client.query(query, values, (error, response) => {
        if (error) {
            res.status(500).json({ error: error.message });
        }
        res.status(200).json(response.rows);
    });
}

module.exports = {
    getPartidesActives,
    getPartidesFinalitzades,
};