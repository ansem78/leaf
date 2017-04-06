const tap = require('tap');
const crypto = require('../core/server/utilities/user').cryptoWrapper;
const salt = crypto.generateSalt()
tap.ok(salt.words.length>0,'salt ok') // verifico che sia stato creato il salt
const hashedPassword = crypto.hashPassword('test',salt)
tap.ok(hashedPassword,'password hashed') // verifico  che la password sia stata criptata
const from_db_salt = salt.words.join() // questo è il formato con cui  salt  è inserito nel db
const expanded_salt = {
    words:from_db_salt.split(','),
    sigBytes :16
}
tap.equal(hashedPassword.words.join(),crypto.hashPassword('test',expanded_salt).words.join(),' password verificata')
tap.equal(crypto.stringifyPassword({words:[1,2,3,4]}),'1,2,3,4','stringifyPassword')
