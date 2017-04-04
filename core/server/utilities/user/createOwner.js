module.exports = function (cb){
    const async = require('async');
    const createUser = function(credentials) {

        var owner = {};


        owner.role = 'owner';
        owner._id = credentials._id;
        owner.created_at = new Date();
        const callback = function(err,user){
            if(!err)    console.log('utente  owner creato con successo')
            else console.log('sono stati riscontrati dei problemi')
            cb()
        }
            }
    process.stdin.resume();
    const  getEmail = function(callback){
            require('./readKeyboard')("inserisci la mail dell'utente owner",(text)=>{
            var data = {'email':text.replace('\n','')}
            callback(null,data)});

    }
    const getPassword = function(data,callback){
        process.stdin.resume();
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
          getPassword
      ]
      async.waterfall(functionsList,(error,data)=>{
            console.log('waterfall ok',data)
            createUser(data);
            cb();

      })

      /*process.stdin.on('data', function (text) {
        //console.log('received data:', util.inspect(text));
        console.log('inserisci la password')
        process,stdin.on('data'(texy=>{}))
//TODO leggere password, creare salt, hash password creare utente
      });*/

}
