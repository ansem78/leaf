var tap = require('tap')
tap.test('login',function(t){
    console.log('test started')
    const cb = function(results){
        console.log('callback',results)
        t.end()
    }
    require('../core/server/utilities/user').login('arpho@iol.it','vilu7240',cb)
})
