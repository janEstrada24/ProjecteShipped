const client = require("../Database/connection.js");

const getAllParticipants = async (req, res) => {
    const query = "SELECT * FROM participant";

    client
        .query(query, (err, result) => {
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
    getAllParticipants,
    postParticipant
};