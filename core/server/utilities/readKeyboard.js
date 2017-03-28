module.exports = function(text,cb){
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    console.log(text)
    process.stdin.once('data',cb) // cb  riceve il testo digitato
}
