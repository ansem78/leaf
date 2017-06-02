var connection;

Object.defineProperty(exports,'knex',{
    enumerable : true,
    configurable : true,
    get : function() {
        connection = connection || require('./connection');
        return connection;
    }
});