(function () {
  'use strict';

  angular
    .module('AddressBookApp')
    .service('LocaleService', LocaleService);

  LocaleService.inject = ['$translate', '$q'];

  function LocaleService($translate, $q) {

    var getCountryNames =  function(){
      var deferred = $q.defer();
      $translate(['COUNTRY.Sweden', 'COUNTRY.Spain', 'COUNTRY.England'])
        .then(function (list) {
          deferred.resolve(list);
        });
      return deferred.promise;
    };

    return {
      getCountryNames: getCountryNames
    };
  }
})();
