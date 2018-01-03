angular.module('Leaf')

// Return human readable bytes.
.filter('bytesFormat',[function() {

  return function(bytes,decimals,intsys) {
     bytes = parseInt(bytes) || 0;
     if (bytes<=0) return '0 Bytes';
     var k = (intsys)? 1000 : 1024;
     decimals = parseInt(decimals) || 0;
     if (decimals<0) decimals = 0;
     var sizes = ['Bytes','KB','MB','GB','TB','PB','EB','ZB','YB'],
     i = Math.floor(Math.log(bytes) / Math.log(k));
     return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + ' ' + sizes[i];
  };

}])

// Count words in a string.
.filter('wordCount',[function() {

  return function(str) {
    if (!str) return 0;
    return str.toString().split(/\s+/g).length;
  };

}])

// Return the time passed from a past given date to now.
.filter('elapsedTime',[function() {

  return function(date,fallback,nosuffix) {
    fallback = fallback || '';
    if (!date) return fallback;
    date = moment(date);
    if (date.valueOf()>moment().valueOf()) return fallback;
    return date.fromNow(nosuffix || false);
  };

}])

// Return the remaining time from now to a future given date.
.filter('remainingTime',[function() {

  return function(date,fallback,noprefix) {
    fallback = fallback || '';
    if (!date) return fallback;
    date = moment(date);
    if (date.valueOf()<moment().valueOf()) return fallback;
    return moment().to(date,noprefix || false);
  };

}]);