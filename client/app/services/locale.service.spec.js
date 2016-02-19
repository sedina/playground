(function () {
  'use strict';

  describe('Service: LocaleService', function () {
    var
      LocaleService,
      $translate;

    // Set up the module
    beforeEach(module('AddressBookApp'));

    beforeEach(inject(function ($injector) {
      LocaleService = $injector.get('LocaleService');
      $translate = $injector.get('$translate');
    }));

    it('should exists', function () {
      expect(LocaleService).toBeDefined();
    });

    it('should expose public API', function () {
      expect(LocaleService.getCountryNames).toBeDefined();
    });

   /* describe('getCountryNames', function () {
      it('should return resolved promise with data', function () {
        var list = ['a', 'b', 'c'];
        sinon.stub($translate).returns($q.when(list));
        LocaleService.getCountryNames().then(function(data){
          expect(data).toBe(list);
        });

      });
    });*/

  });

})();
