module.exports = function (email, password, cb) {
    const out = {}
    const Users = require('../../models/users');
    new Users().query({
        where: {
            email: email
        }
    }).fetchAll().then((user) => {
        if (user.length == 0) { //utente non registrat
            out.user_verified = false;
            out.registered_uer = false;
            out.msg = 'email  o password non validi'
        } else {
            const crypto = require("crypto-js");
            const salt = {};
            salt.words = user.toJSON()[0].salt.split(',');
            salt.sigBytes = 16;
            const checkPassword = (err, hash) => { //funzione  di callback per hashPasswordAsync
                if (err) {
                    out.user_verified = false;
                    out.msg = 'errore del server';
                    cb(out); // esegue la funzione di callback
                }
                out.user_verified = user.toJSON()[0].password === hash.words.join();
                if (out.user_verified) {
                    out.user_logged = true;
                    const Token = randtoken = require('neo-rand-token');
                    const token = Token.generate(128);
                    out.token = token;
                    const loggedUser = user.toJSON()[0];
                    const NodeCache = require("node-cache");
                    const cache = require('../').cache;
                    cache.setCache(token, user.toJSON()[0]);
                    out.token = token;
                } else {
                    out.msg = 'email  o password non validi'
                }
                cb(out);
            }
            require('./cryptoWrapper').hashPasswordAsync(password, salt, checkPassword)
        }
    })


}
