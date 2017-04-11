const tap = require('tap')
tap.test('login',function(t){
    const cb = function(results){
        t.ok(results.user_verified,'log-in successfull')
        if(results.user_logged){
            t.ok(results.token,'token generato')
            t.ok(require('../core/server/utilities').cache.retrieve(results.token),'token valido')

        }
        t.end()
    }
    require('../core/server/utilities/user').login('damicogiuseppe77@gmail.com','vilu7240',cb) //login ok
})
tap.test('login fallito',function(t){
    const callback = function(results){
        t.notOk(results.user_logged,'utente non loggato');
        t.notOk(results.token,'nessun token generato');
        t.equal('email  o password non validi',results.msg,'messaggio dal server');
        t.end();
    }
    require('../core/server/utilities/user').login('damicogiusepe77@gmail.com','vilu7240',callback)//  email non registrata
})
