const tap = require('tap')
const userOperations = require('../core/server/utilities/user')
tap.test('successfull login',(t) => {
    const cb = (results) => { // callback per la chiamata alla funzione sotto test questa eseguirà i test
        console.log('results',results);
        t.ok(results.user_verified,'log-in successfull')
        if(results.user_logged){
            t.ok(results.token,'token generato')
            t.ok(require('../core/server/utilities').cache.retrieve(results.token),'token valido')

        }
        t.end()

    }
    userOperations.login('damicogiuseppe77@gmail.com','vilu7240',cb) //login ok
})
