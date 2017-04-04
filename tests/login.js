var tap = require('tap')
tap.test('login',function(t){
    const cb = function(results){
        t.ok(results.logged,'log-in successfull')
        t.end()
    }
    require('../core/server/utilities/user').login('damicogiuseppe77@gmail.com','vilu7240',cb)
})
