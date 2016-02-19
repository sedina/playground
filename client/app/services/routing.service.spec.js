(function () {
  'use strict';

  describe('Service: RoutingService', function () {
    var
      RoutingService;

    // Set up the module
    beforeEach(module('AddressBookApp'));

    beforeEach(inject(function ($injector) {
      RoutingService = $injector.get('RoutingService');
    }));

    it('should exists', function () {
      expect(RoutingService).toBeDefined();
    });

    it('should expose public API', function () {
      expect(RoutingService.isRouteActive).toBeDefined();
      expect(RoutingService.getIdUrlParam).toBeDefined();
    });

  });

})();
