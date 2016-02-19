(function () {
  'use strict';

  describe('Service: CacheService', function () {
    var
      CacheService;

    // Set up the module
    beforeEach(module('AddressBookApp'));

    beforeEach(inject(function ($injector) {
      CacheService = $injector.get('CacheService');
    }));

    it('should exists', function () {
      expect(CacheService).toBeDefined();
    });

    it('should expose public API', function () {
      expect(CacheService.get).toBeDefined();
      expect(CacheService.put).toBeDefined();
      expect(CacheService.delete).toBeDefined();
      expect(CacheService.getAllByPrefix).toBeDefined();
      expect(CacheService.getCountByPrefix).toBeDefined();
    });

  });

})();
