const client = require("../Database/connection.js");

const getVaixellsByPartidaAndCorreuUsuari = async (req, res) => {
    const values = [req.params.idpartida, req.params.correuusuari, 'actiu'];
    const query = "SELECT * FROM vaixell WHERE idpartida = $1 AND correuusuari = $2 and estat = $3";

    client
        .query(query, values, (err, result) => {
            if (err) {
                res.status(404).json({ error: "Error en obtenir els vaixells del jugador" });
            } else {
                res.status(200).json(result.rows);
            }
        });
}

function getVaixellByCorreuPartidaAndNum(correuusuari, idpartida, numvaixell) {
    return new Promise((resolve) => {
        client.query(
            `SELECT *
            FROM vaixell
            WHERE correuusuari = '${correuusuari}'
            AND idpartida = '${idpartida}'
            AND numvaixell = ${numvaixell}`,
            (err, result) => {
                resolve(result.rows[0]);
            }
        )
    });
}

const postVaixell = async (req, res) => {
    const values = [req.body.correuusuari, req.body.idpartida, req.body.numvaixell, 0, req.body.color, 'actiu'];
    const query = "INSERT INTO vaixell (correuusuari, idpartida, numvaixell, municio, color, estat) VALUES ($1, $2, $3, $4, $5, $6)";

    client
        .query(query, values, (err, result) => {
            if (err) {
                res.status(404).json({ error: "No s'ha pogut afegir el vaixell" });
            } else {
                res.status(200).json({ message: "Vaixell afegit correctament" });
            }
        });
}

const getMunicioVaixell = async (req, res) => {
    const values = [req.params.correuusuari, req.params.idpartida, req.params.numvaixell];
    const query = "SELECT municio FROM vaixell WHERE correuusuari = $1 AND idpartida = $2 AND numvaixell = $3";
    const vaixell = await getVaixellByCorreuPartidaAndNum(req.params.correuusuari, req.params.idpartida, req.params.numvaixell);
    
    if (vaixell == null || vaixell == undefined) {
        res.status(404).send("Vaixell no existent");
    } else {
        client
            .query(query, values, (err, result) => {
                if (err) {
                    res.status(404).json({ error: "Error en obtenir la municio del vaixell" });
                } else {
                    res.status(200).json(result.rows);
                }
            });
    }
}

const putEstatVaixellDestruit = async (req, res) => {
    const values = [req.params.correuusuari, req.params.idpartida, req.params.numvaixell, 'destruit'];
    const query = "UPDATE vaixell SET estat = $4 WHERE correuusuari = $1 AND idpartida = $2 AND numvaixell = $3";

    client
        .query(query, values, (err, result) => {
            if (err) {
                res.status(404).json({ error: "No s'ha pogut actualitzar l'estat del vaixell" });
            } else {
                res.status(200).json({ message: "Estat del vaixell actualitzat correctament" });
            }
        });
}

const sumarMunicio = async (req, res) => {
    const values = [req.params.correuusuari, req.params.idpartida, req.params.numvaixell];
    const query = "UPDATE vaixell SET municio = municio + 1 WHERE correuusuari = $1 AND idpartida = $2 AND numvaixell = $3";

    client
        .query(query, values, (err, result) => {
            if (err) {
                res.status(404).json({ error: "No s'ha pogut sumar municio" });
            } else {
                res.status(200).json({ message: "Municio sumada correctament" });
            }
        });
}

const restarMunicio = async (req, res) => {
    const values = [req.params.correuusuari, req.params.idpartida, req.params.numvaixell];
    const query = "UPDATE vaixell SET municio = municio - 1 WHERE correuusuari = $1 AND idpartida = $2 AND numvaixell = $3";

    client
        .query(query, values, (err, result) => {
            if (err) {
                res.status(404).json({ error: "No s'ha pogut restar municio" });
            } else {
                res.status(200).json({ message: "Municio restada correctament" });
            }
        });
}

module.exports = {
    getVaixellsByPartidaAndCorreuUsuari,
    postVaixell,
    putEstatVaixellDestruit,
    getMunicioVaixell,
    sumarMunicio,
    restarMunicio
};