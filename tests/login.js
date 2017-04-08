const tap = require('tap')
tap.test('login',function(t){
    const cb = function(results){
        t.ok(results.logged,'log-in successfull')
        if(results.logged){
            t.ok(results.token,'token generato')
            t.ok(require('../core/server/utilities').cache.retrieve(results.token),'token valido')

        }
        else{
            t.notOk(results.token)

        }
        t.end()
    }
    require('../core/server/utilities/user').login('damicogiuseppe77@gmail.com','vilu7240',cb) //login ok
})
