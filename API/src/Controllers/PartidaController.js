const client = require("../Database/connection.js");
const { v4: uuidv4 } = require('uuid');

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

const postPartida = (async (req, res) => {
    const uuid = uuidv4();

    const values = [
                    uuid,
                    req.body.nom,
                    new Date().toISOString(),
                    req.body.correucreador,
                    'actiu'
                    ];

    const query = 'INSERT INTO partida (id, nom, datainici, correucreador, estat) VALUES ($1, $2, $3, $4, $5)';

    client
        .query(query, values, (err, result) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.status(200).json({ message: "Partida creada correctament"});
            }
        });
});

const putDataFinalGuanyadorAndEstatPartida = (async (req, res) => {
    const values = [req.body.id, new Date().toISOString(), req.body.correuguanyador, 'finalitzada'];
    const query = 'UPDATE partida SET datafinal = $2, correuguanyador = $3, estat = $4 WHERE id = $1';

    client
        .query(query, values, (err, result) => {
            if (err) {
                res.status(404).json({ error: "No s'ha pogut actualitzar la partida"});
            } else {
                res.status(200).json({ message: "Partida actualitzada correctament"});
            }
        });
});

module.exports = {
    getPartidesActives,
    getPartidesFinalitzades,
    postPartida,
    putDataFinalGuanyadorAndEstatPartida
};