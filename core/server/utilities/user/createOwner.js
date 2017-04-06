const crypto = require('./cryptoWrapper')
module.exports = function (cb){
    const async = require('async');
    const createUser = function(data,next) {
        var owner = {};


        owner.role = 'owner';
        owner._id = data._id;
        owner.email = data.email;
        const salt = crypto.generateSalt();
        owner.salt = crypto.stringifyPassword(salt);
        owner.password = crypto.stringifyPassword(crypto.hashPassword(data.password,salt));
        owner.created_at = new Date();
        const callback = function(user,err){
            if(!err)    {
                console.log('utente  owner creato con successo')
                next()
            }
            else {
                console.log('sono stati riscontrati dei problemi',err)
                next()
            }
        }
        require('./createUser')(owner,callback)
            }
    //process.stdin.resume();
    const  getEmail = function(callback){
            require('./readKeyboard')("inserisci la mail dell'utente owner",(text)=>{
            var data = {'email':text.replace('\n','')}
            callback(null,data)});

    }
    const getPassword = function(data,callback){
        //process.stdin.resume();
        process.stdin.setEncoding('utf8');
        require('./readKeyboard')("inserisci la password per l'utente owner", (text)=>{ //il listener è attivato solo una volta
        data.password = text.replace('\n','')
        callback(null,data);
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
          getPassword,
          createUser
      ]
      async.waterfall(functionsList,(error,data)=>{
            cb();

      })



}
