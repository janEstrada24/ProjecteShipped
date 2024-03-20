const client = require("../Database/connection.js");
const { v4: uuidv4 } = require('uuid');

const getPosicionsVaixells = async (req, res) => {
    try {
        const response = await client.query("SELECT * FROM posiciovaixell;");
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const postPosicioVaixell = async (req, res) => {

    const values = [
        req.body.idvaixell,
        req.body.idusuari,
        new Date().toISOString(),
        req.body.x,
        req.body.y
    ];

    const query = 'INSERT INTO posiciovaixell (idvaixell, idusuari, datainicipartida, x, y) VALUES ($1, $2, $3, $4, $5)';

    client
        .query(query, values, (err, result) => {
            if (err) {
                res.status(404).json(err);
            } else {
                res.status(200).json({ message: "Vaixell afegit correctament" });
            }
        });
}

const updatePosicioVaixell = async (req, res) => {
    const values = [
        req.body.idvaixell,
        req.body.idusuari,
        req.body.x,
        req.body.y
    ];

    const query = 'UPDATE posiciovaixell SET x = $3, y = $4 WHERE idvaixell = $1 AND idusuari = $2';

    client
        .query(query, values, (err, result) => {
            if (err) {
                res.status(404).json({ error: "No s'ha pogut actualitzar la posicio del vaixell" });
            } else {
                res.status(200).json({ message: "Posicio del vaixell actualitzada correctament" });
            }
        });
};

const deletePosicionsVaixells = async (req, res) => {
    const query = 'DELETE FROM posiciovaixell';

    client
        .query(query, (err, result) => {
            if (err) {
                res.status(404).json({ error: "No s'han pogut eliminar les posicions dels vaixells." });
            } else {
                res.status(200).json({ message: "Posicions dels vaixells eliminades correctament." });
            }
        });
}

module.exports = {
    getPosicionsVaixells,
    postPosicioVaixell,
    updatePosicioVaixell,
    deletePosicionsVaixells
};