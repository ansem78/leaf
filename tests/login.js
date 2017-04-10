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
