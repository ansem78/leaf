module.exports = function(email,password,cb){
    const Users = require('../../models/users');
    console.log('email',email,'password',password)
     new Users().query({where:{email:email}}).fetchAll().then((user) =>{
         const crypto = require("crypto-js")
         const salt = {}
         salt.words = user.toJSON()[0].salt.split(',')
         salt.sigBytes = 16
         console.log('salt',salt)
         const hashed_password = hashed_password = crypto.PBKDF2(user.toJSON()[0].password, salt, { keySize: 512/32, iterations: 1000 })
         console.log(hashed_password,'password')
         console.log('user password',user.toJSON()[0].password)
         console.log('hash password',hashed_password.words.join())
         console.log('paswords match', user.toJSON()[0].password === hashed_password.words.join())


     })
    cb(true)

}
