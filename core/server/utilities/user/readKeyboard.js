const chalk = require('chalk')
module.exports = function(text,cb){
    /*
    @param  string testo da visuaizzare
    @param funzione di callback riceverà una stringa di testo, il valore digitato dall'utente
    */
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    console.log(chalk.yellow(text));
    process.stdin.once('data',cb); // cb  riceve il testo digitato
}
