'use strict';

describe('Controller: ContactDetailsFormController', function () {

  // load the controller's module
  beforeEach(module('AddressBookApp'));

  var
      contact = { id: '1', firstName: 'John', lastName: 'Bravo'},
      countryList = ['Sweden', 'England'],
      ContactDetailsFormController,
      RoutingService,
      createController,
      $q,
      ContactDataStore,
      LocaleService,
      $httpBackend,
      $rootScope,
      Dispatcher;

  // inject dependencies
  beforeEach(inject(function ($injector) {
        $q = $injector.get('$q');
        RoutingService = $injector.get('RoutingService');
        ContactDataStore = $injector.get('ContactDataStore');
        LocaleService = $injector.get('LocaleService');
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
    sinon.stub(ContactDataStore, 'getContact').returns(contact);
    sinon.stub(LocaleService, 'getCountryNames').returns($q.when(countryList));
  });

  // Initialize the controller and inject stubbed dependencies
  beforeEach(inject(function ($controller) {
        // we have to assign to a function to be able to set different initial routes
        createController = function(){
          ContactDetailsFormController = $controller(
              'ContactDetailsFormController', {
                'RoutingService': RoutingService,
                'ContactDataStore': ContactDataStore,
                'LocaleService': LocaleService,
                'Dispatcher': Dispatcher
              });
          $rootScope.$digest();
        };
      })
  );


  describe('init', function () {
    it('should initialize without contact data when state new', function () {
      sinon.stub(RoutingService, 'getIdUrlParam').returns('new');
      createController();
      sinon.stub(ContactDetailsFormController, 'isNew').returns(true);
      expect(ContactDataStore.getContact.called).toBe(false);
      expect(ContactDetailsFormController.contact).toBe(undefined);
    });
    it('should initialize with data from ContactDataStore when state not new', function () {
      sinon.stub(RoutingService, 'getIdUrlParam').returns(contact.id);
      createController();
      sinon.stub(ContactDetailsFormController, 'isNew').returns(false);
      expect(ContactDataStore.getContact.calledWith(contact.id)).toBe(true);
      expect(ContactDetailsFormController.contact).toBe(contact);
    });
    it('should initialize with data for country selection', function () {
      createController();
      expect(LocaleService.getCountryNames.called).toBe(true);
      expect(ContactDetailsFormController.countryList).toBe(countryList);
    });
  });
  describe('delete', function () {
    beforeEach(function () {
      sinon.stub(ContactDataStore, 'removeContact');
    });

    it('should not delete contact data when state new', function () {
      createController();
      sinon.stub(ContactDetailsFormController, 'isNew').returns(true);
      ContactDetailsFormController.delete();
      expect(ContactDataStore.removeContact.called).toBe(false);
    });

    it('should not try to delete non existing contact', function () {
      createController();
      ContactDetailsFormController.contact = undefined;
      ContactDetailsFormController.delete();
      expect(ContactDataStore.removeContact.called).toBe(false);
      ContactDetailsFormController.contact = contact;
    });

    it('should delete existing contact when state not new', function () {
      sinon.stub(RoutingService, 'getIdUrlParam').returns(contact.id);
      createController();
      sinon.stub(ContactDetailsFormController, 'isNew').returns(false);
      expect(ContactDetailsFormController.contact).toBe(contact);
      ContactDetailsFormController.delete();
      expect(ContactDataStore.removeContact.calledWith(contact)).toBe(true);
    });
  });
  describe('save', function () {
    beforeEach(function () {
      sinon.stub(ContactDataStore, 'updateContact');
      sinon.stub(ContactDataStore, 'addContact');
    });

    it('should not save contact data when form validation invalid', function () {
      sinon.stub(RoutingService, 'getIdUrlParam').returns(contact.id);
      createController();
      ContactDetailsFormController.save(false);
      expect(ContactDataStore.updateContact.called).toBe(false);
      expect(ContactDataStore.addContact.called).toBe(false);
    });

    it('should update existing contact when form validation valid and state not new', function () {
      sinon.stub(RoutingService, 'getIdUrlParam').returns(contact.id);
      createController();
      sinon.stub(ContactDetailsFormController, 'isNew').returns(false);
      ContactDetailsFormController.save(true);
      expect(ContactDataStore.updateContact.calledWith(contact)).toBe(true);
      expect(ContactDataStore.addContact.called).toBe(false);
    });
    it('should add new contact when form validation valid and state new', function () {
      sinon.stub(RoutingService, 'getIdUrlParam').returns('new');
      createController();
      sinon.stub(ContactDetailsFormController, 'isNew').returns(true);
      var newContact = { firstName: 'John', lastName: 'Bravo'};
      ContactDetailsFormController.contact = newContact;
      ContactDetailsFormController.save(true);
      expect(ContactDataStore.updateContact.called).toBe(false);
      expect(ContactDataStore.addContact.calledWith(newContact)).toBe(true);
    });
  });
  describe('cancel', function () {
    beforeEach(function () {
      sinon.stub(Dispatcher, 'publish');
    });

    it('should publish event cancel:detail:form', function () {
      createController();
      ContactDetailsFormController.cancel();
      var eventName = Dispatcher.publish.getCall(0).args[0];
      expect(eventName).toBe('cancel:detail:form');
    });

  });
  describe('isNew', function () {
    it('should return true when state new', function () {
      sinon.stub(RoutingService, 'getIdUrlParam').returns('new');
      createController();
      expect(ContactDetailsFormController.isNew()).toBe(true);
    });
    it('should return false when state not new', function () {
      sinon.stub(RoutingService, 'getIdUrlParam').returns(contact.id);
      createController();
      expect(ContactDetailsFormController.isNew()).toBe(false);
    });
  });
});
