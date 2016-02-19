(function () {
  'use strict';

  describe('Service: dispatcher', function () {
    var
      Dispatcher;

    // Set up the module
    beforeEach(module('Dispatcher'));

    beforeEach(inject(function ($injector) {
      Dispatcher = $injector.get('Dispatcher');
    }));

    it('should exists', function () {
      expect(Dispatcher).toBeDefined();
    });

    it('should expose public API', function () {
      expect(Dispatcher.publish).toBeDefined();
      expect(Dispatcher.subscribe).toBeDefined();
    });

  });

})();
