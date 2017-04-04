const NodeCache = require( "node-cache" );
const cache = new NodeCache( { stdTTL: 7200, checkperiod: 7400 } );// cache con ttl di due ore e checkPeriod di 7400 secondi
module.exports = {
    setCache : function(key,value){
        cache.set(key,value)
    },
    retrieve : function(key){
        return cache.get(key)
    },
    remove : function(key){
      return cache.del(key)
    }
}
