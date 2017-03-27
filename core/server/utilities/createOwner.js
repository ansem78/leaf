module.exports = function (bookshelf,cb){
    const async = require('async')
    process.stdin.resume();
    const  getEmail = function(callback){
            console.log("inserisci la mail dell'utente owner")
            process.stdin.once('data',(text)=>{
            var data = {'email':text.replace('\n','')}
            callback(null,data)})
    }
    const getPassword = function(data,callback){
        console.log('dati ricevuti:',data)
        process.stdin.resume();
        process.stdin.setEncoding('utf8');
        console.log("inserisci la password per l'utente owner")
        process.stdin.once('data', (text)=>{ //il listener è attivato solo una volta
        data.password = text.replace('\n','')
        callback(null,data)
    })
}
      process.stdin.setEncoding('utf8');
      var util = require('util');
      const functionsList = [
          getEmail,
          getPassword
      ]
      async.waterfall(functionsList,(error,data)=>{
            console.log('waterfall ok',data)
            cb()

      })

      /*process.stdin.on('data', function (text) {
        //console.log('received data:', util.inspect(text));
        console.log('inserisci la password')
        process,stdin.on('data'(texy=>{}))
//TODO leggere password, creare salt, hash password creare utente
      });*/

}
