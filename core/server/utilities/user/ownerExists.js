module.exports = (callback) => {
    const Users = require('../../models/users');
    new Users().query({
        where: {
            role: 'owner'
        }
    }).fetchAll().then((users) => {
        // owner non esiste
        callback((users.toJSON().length != 0)) //se la lista è nulla non è stato definito un utente owner
    })
}
