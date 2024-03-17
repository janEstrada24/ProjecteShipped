const client = require("../Database/connection.js");

const getParticipantsByPartida = async (req, res) => {
    const values = [req.params.idpartida];
    const query = "SELECT * FROM participant WHERE idpartida = $1";

    client
        .query(query, values, (err, result) => {
            if (err) {
                res.status(404).json({ error: "No hi han participants" });
            } else {
                res.status(200).json(result.rows);
            }
        });
}

const postParticipant = async (req, res) => {
    const values = [req.body.correuusuari, req.body.nomusuari, req.body.idpartida];
    const query = "INSERT INTO participant (correuusuari, nomusuari, idpartida) VALUES ($1, $2, $3)";

    client
        .query(query, values, (err, result) => {
            if (err) {
                res.status(404).json({ error: "No s'ha pogut afegir el participant" });
            } else {
                res.status(200).json({ message: "Participant afegit correctament" });
            }
        });
}

module.exports = {
    getParticipantsByPartida,
    postParticipant
};