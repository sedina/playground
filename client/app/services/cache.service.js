(function () {
  'use strict';

  angular
    .module('AddressBookApp')
    .service('CacheService', CacheService);

  function CacheService() {

    var get = function(key){
      return JSON.parse(window.localStorage.getItem(key));
    };

    var getCountByPrefix = function(prefixStr){
      var key, count = 0;
      for (var i = 0; i < window.localStorage.length; i++){
        key = window.localStorage.key(i);
        if (key.substring(0,prefixStr.length) === prefixStr) {
          count++;
        }
      }
      return count;
    };

    var getAllByPrefix = function(prefixStr){
      var arr = [], key;
      for (var i = 0; i < window.localStorage.length; i++){
        key = window.localStorage.key(i);
        if (key.substring(0,prefixStr.length) === prefixStr) {
          arr.push(JSON.parse(window.localStorage.getItem(key)));
        }
      }
      return arr;
    };

    var put = function (key, data) {
      window.localStorage.setItem(key, JSON.stringify(data));
    };

    var remove = function (key) {
      window.localStorage.removeItem(key);
    };

    return {
      get: get,
      getAllByPrefix: getAllByPrefix,
      getCountByPrefix: getCountByPrefix,
      put: put,
      delete: remove
    };
  }
})();
