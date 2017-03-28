module.exports = function (bookshelf,cb){
    const async = require('async')
    const createUser = function(credentials) {
        const crypto = require("crypto-js"),salt = crypto.lib.WordArray.random(128/8)
        var key512Bits1000Iterations = crypto.PBKDF2(credentials.password, salt, { keySize: 512/32, iterations: 1000 });
        delete key512Bits1000Iterations.$super
        const Users = require('../models/users')
        var owner = {};
        owner.salt = salt.words.join();
        owner.email = credentials.email;
        owner.password = key512Bits1000Iterations.words.join();

        owner.role = 'owner';
        owner._id = credentials._id;
        owner.created_at = new Date();
        console.log('owner',owner)
        new Users(owner).save().then((data)=>{console.log('utente owner creato con successo',data)}).catch((err)=>{console.log('sono stati riscontrati degli errori',err)})
        console.log('crypto ok')
    }
    process.stdin.resume();
    const  getEmail = function(callback){
            require('./readKeyboard')("inserisci la mail dell'utente owner",(text)=>{
            var data = {'email':text.replace('\n','')}
            callback(null,data)})

    }
    const getPassword = function(data,callback){
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        require('./readKeyboard')("inserisci la password per l'utente owner", (text)=>{ //il listener è attivato solo una volta
        data.password = text.replace('\n','')
        callback(null,data)
    })
}
    const getUserName = function(data,callback){
        require('./readKeyboard')("inserisci lo username dell'utente owner",(text)=>{
            data._id = text.replace('\n',''),
            callback(null,data);
        })
    }
      process.stdin.setEncoding('utf8');
      var util = require('util');
      const functionsList = [
          getEmail,
          getUserName,
          getPassword
      ]
      async.waterfall(functionsList,(error,data)=>{
            console.log('waterfall ok',data)
            createUser(data)
            cb()

      })

      /*process.stdin.on('data', function (text) {
        //console.log('received data:', util.inspect(text));
        console.log('inserisci la password')
        process,stdin.on('data'(texy=>{}))
//TODO leggere password, creare salt, hash password creare utente
      });*/

}
