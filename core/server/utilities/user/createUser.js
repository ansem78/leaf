/*crea un utente
    @param user:
*/
    module.exports = function(user,callback){
    const crypto = require("./cryptoWrapper")
    const Users = require('../../models/users')
    new Users(user).save().then(callback)

}
