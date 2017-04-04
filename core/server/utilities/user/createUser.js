/*crea un utente
    @param user:
*/
    exports.module = function(user,password,callback){
    const crypto = require("crypto-js")
    const salt = crypto.lib.WordArray.random(128/8)
    var key512Bits1000Iterations = crypto.PBKDF2(credentials.password, salt, { keySize: 512/32, iterations: 1000 });
    delete key512Bits1000Iterations.$super
    const Users = require('../../models/users')
    user.salt = salt.words.join();
    user.password = key512Bits1000Iterations.words.join();
    new Users(user).save().then(callback)

}
