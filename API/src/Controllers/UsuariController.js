const client = require("../Database/connection.js");
const bcrypt = require("bcrypt");
const usuari = require("../Model/Implementations/Usuari/Usuari.js");

const login = async (req, res) => {
    const usuari = await getUsuariByCorreu(req.body.correu);

    if (usuari == null || usuari == undefined) {
        res.status(404).send("Usuari o contrasenya no vàlids");
    } else {
        console.log(usuari);
        if (await bcrypt.compare(req.body.contrasenya, usuari.contrasenya)) {
            res.json({ user: usuari });
        } else {
            res.status(401).send("Password incorrect!");
        }
    }
};

const logout = (async (req, res) => {
    if (req.headers["authorization"]) {
        const accessToken = req.headers["authorization"].split(' ')[1];
        token.deleteRefreshToken(accessToken);
        res.status(204).send("Logged out!");
    } else {
        res.status(401).send("Unauthorized");
    }
});

const registre = async (req, res) => {
    const hashedPassword = await usuari.encrypt(req.body.contrasenya);
    const query = "INSERT INTO usuari (correu, nom, contrasenya, victories, empats, estat) VALUES($1, $2, $3, $4, $5, $6)";
    const values = [req.body.correu, req.body.nom, hashedPassword, 0, 0, 'actiu'];

    client
        .query(query, values)
        .then((result) => res.send("Usuari afegit correctament"))
        .catch((e) => res.send(e));
};

function getUsuariByCorreu(correu) {
    return new Promise((resolve) => {
        client.query(
            `SELECT *
            FROM usuari
            WHERE correu = '${correu}'
            AND estat = 'actiu'`,
            (err, result) => {
                resolve(result.rows[0]);
            }
        );
    });
}

const getUsuarisAsc = async (req, res) => {
    try {
        const response = await client.query("SELECT * FROM usuari WHERE estat = 'actiu' ORDER BY Victories ASC, Empats ASC;");
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUsuarisDesc = async (req, res) => {
    try {
        const response = await client.query("SELECT * FROM usuari WHERE estat = 'actiu' ORDER BY Victories DESC, Empats DESC;");
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const sumarVictoria = (async (req, res) => {
    const values = [req.body.correu, 'actiu'];
    const query = 'UPDATE usuari SET victories = victories + 1 WHERE correu = $1 AND estat = $2';

    client
        .query(query, values, (err, result) => {
            if (err) {
                res.status(404).json({ error: "No hi han jugadors disponibles" });
            } else {
                res.status(200).json("Victoria sumada correctament");
            }
        });
});

const sumarEmpat = (async (req, res) => {
    const values = [req.body.correu, 'actiu'];
    const query = 'UPDATE usuari SET empats = empats + 1 WHERE correu = $1 AND estat = $2';

    client
        .query(query, values, (err, result) => {
            if (err) {
                res.status(404).json({ error: "No hi han jugadors disponibles" });
            } else {
                res.status(200).json("Empat sumat correctament");
            }
        });
});

module.exports = {
    login,
    logout,
    registre,
    getUsuarisAsc,
    getUsuarisDesc,
    sumarVictoria,
    sumarEmpat
};