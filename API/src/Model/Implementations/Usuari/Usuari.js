const bcrypt = require("bcrypt");

class Usuari {
    password;

    constructor(password) {
        this.password = password;
    }

    static async encrypt(password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
}

module.exports = Usuari;