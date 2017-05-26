const crypto = require("crypto-js")
module.exports = {
    generateSalt: function () {
        return crypto.lib.WordArray.random(128 / 8)
    },
    generateSaltAsync: (callback) => {
        crypto.lib.WordArray.random(128 / 8, callback)
    },
    hashPassword: function (password, salt) {
        return crypto.PBKDF2(password, salt, {
            keySize: 512 / 32,
            iterations: 1000
        })
    },
    hashPasswordAsync: (password, salt, callback) => {
        crypto.PBKDF2(password, salt, {
            keySize: 512 / 32,
            iterations: 1000
        }, callback)
    },

    /*esegue il join del campo words del parametro
    @param Object risultato delle operazioni del modulo crypto-js
    @note l'oggetto deve avere come campo words un array di valori
    @return string la concatenazione deglioggetti di words separati da virgola */
    stringifyPassword: (pw) => {
        return pw.words.join()
    }
}
