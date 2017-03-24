module.exports = function (bookshelf){
    console.log("inserisci l'email dell'utente owner")
    process.stdin.resume();
      process.stdin.setEncoding('utf8');
      var util = require('util');

      process.stdin.on('data', function (text) {
        console.log('received data:', util.inspect(text));
//TODO leggere password, creare salt, hash password creare utente
      });

}
