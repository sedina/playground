'use strict';

describe('Controller: ContactListController', function () {

  // load the controller's module
  beforeEach(module('AddressBookApp'));

  var
    contactList = [
      { id: '1', firstName: 'John', lastName: 'Bravo', email: 'b@a.com', country: 'England'},
      { id: '2', firstName: 'Johanna', lastName: 'Bravo', email: 'c@a.com', country: 'Sweden'}
    ],
    ContactListController,
    RoutingService,
    $q,
    ContactDataStore,
    NgTableParams,
    $filter,
    $httpBackend,
    $rootScope,
    Dispatcher;

  // inject dependencies
  beforeEach(inject(function ($injector) {
      $q = $injector.get('$q');
      RoutingService = $injector.get('RoutingService');
      ContactDataStore = $injector.get('ContactDataStore');
      NgTableParams = $injector.get('NgTableParams');
      $filter = $injector.get('$filter');
      $rootScope = $injector.get('$rootScope');
      $httpBackend = $injector.get('$httpBackend');
      Dispatcher = $injector.get('Dispatcher');
    })
  );

  // prepare stubs
  beforeEach(function () {
    $httpBackend.when('GET', /i18n/).respond('');
    $httpBackend.when('GET', /components/).respond('');
    $httpBackend.when('GET', /contacts.json/).respond('');
    sinon.stub(RoutingService, 'isRouteActive').returns(contactList[0].id);
    sinon.stub(ContactDataStore, 'getContacts').returns(contactList);
    sinon.stub(Dispatcher, 'subscribe');
  });

  // Initialize the controller and inject stubbed dependencies
  beforeEach(inject(function ($controller) {
      ContactListController = $controller(
        'ContactListController', {
          'RoutingService': RoutingService,
          'ContactDataStore': ContactDataStore,
          'NgTableParams': NgTableParams,
          '$filter': $filter,
          'Dispatcher': Dispatcher
        });
      $rootScope.$digest();
    })
  );

  it('should exist', function () {
    expect(ContactListController).toBeDefined();
  });

  it('should initialize with data from ContactDataStore', function () {
    expect(ContactDataStore.getContacts.called).toBe(true);
    expect(ContactListController.contacts).toBe(contactList);
  });

  it('should subscribe for event contact:item:removed with a callback function', function () {
    var eventName = Dispatcher.subscribe.getCall(0).args[0];
    var callbackFunction = Dispatcher.subscribe.getCall(0).args[1];
    expect(eventName).toBe('contact:item:removed');
    expect(callbackFunction).toBeDefined();
  });

  it('should subscribe for event contact:item:added with a callback function', function () {
    var eventName = Dispatcher.subscribe.getCall(1).args[0];
    var callbackFunction = Dispatcher.subscribe.getCall(1).args[1];
    expect(eventName).toBe('contact:item:added');
    expect(callbackFunction).toBeDefined();
  });

  it('should subscribe for event contact:item:updated with a callback function', function () {
    var eventName = Dispatcher.subscribe.getCall(2).args[0];
    var callbackFunction = Dispatcher.subscribe.getCall(2).args[1];
    expect(eventName).toBe('contact:item:updated');
    expect(callbackFunction).toBeDefined();
  });

  describe('reloadTable', function () {
    beforeEach(function () {
      sinon.stub(ContactListController.tableParams, 'reload');
    });

    it('should refetch contacts data and reload table', function () {
      var callbackFunction = Dispatcher.subscribe.getCall(2).args[1];
      callbackFunction();
      expect(ContactDataStore.getContacts.called).toBe(true);
      expect(ContactListController.tableParams.reload.called).toBe(true);
    });
  });

  describe('tableParams', function () {
    it('should configure table for only 5 items per page', function () {
      expect(ContactListController.tableParams.count()).toBe(5);
    });

    it('should configure table to show fist page', function () {
      expect(ContactListController.tableParams.page()).toBe(1);
    });
  });
});
