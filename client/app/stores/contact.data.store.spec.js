(function () {

  'use strict';

  describe('Service: ContactDataStore', function () {

    var
      newContact = {name: 'aaa'},
      contact = {id: '1', name: 'aaa'},
      contactList = [
        {id: '1', name: 'aaa'},
        {id: '2', name: 'bbb'}
      ],
      ContactDataStore,
      CacheService,
      Dispatcher,
      $httpBackend;

    // Set up the module
    beforeEach(module('AddressBookApp'));


    beforeEach(inject(function ($injector) {
        ContactDataStore = $injector.get('ContactDataStore');
        CacheService = $injector.get('CacheService');
        Dispatcher = $injector.get('Dispatcher');
        $httpBackend = $injector.get('$httpBackend');
      })
    );

    it('should exist', function () {
      expect(ContactDataStore).toBeDefined();
    });

    it('should expose public API', function () {
      expect(ContactDataStore.init).toBeDefined();
      expect(ContactDataStore.getContacts).toBeDefined();
      expect(ContactDataStore.getContact).toBeDefined();
      expect(ContactDataStore.removeContact).toBeDefined();
      expect(ContactDataStore.updateContact).toBeDefined();
      expect(ContactDataStore.addContact).toBeDefined();
    });


    describe('init', function () {
      it('should initialize by putting initial data to cache', function () {
        sinon.stub(CacheService, 'put');
        ContactDataStore.init(contactList);
        expect(CacheService.put.calledTwice).toBe(true);
        expect(CacheService.put.getCall(0).args[0]).toBe('contact.' + contactList[0].id);
        expect(CacheService.put.getCall(0).args[1]).toBe(contactList[0]);
        expect(CacheService.put.getCall(1).args[0]).toBe('contact.' + contactList[1].id);
        expect(CacheService.put.getCall(1).args[1]).toBe(contactList[1]);
      });

      it('should initialize only once', function () {
        sinon.stub(CacheService, 'put');
        ContactDataStore.init(contactList);
        ContactDataStore.init(contactList);
        expect(CacheService.put.callCount).toBe(2);
      });
    });


    describe('getContacts', function () {
      beforeEach(function(){
        sinon.stub(CacheService, 'getAllByPrefix').returns(contactList);
      });

      it('should return list of contacts from local cache', function () {
        var result = ContactDataStore.getContacts();
        expect(CacheService.getAllByPrefix.getCall(0).args[0]).toBe('contact.');
        expect(result).toBe(contactList);

      });

    });
    describe('getContact', function () {
      beforeEach(function(){
        sinon.stub(CacheService, 'get').returns(contact);
      });

      it('should return contact from local cache when id supplied', function () {
        var result = ContactDataStore.getContact(1);
        expect(CacheService.get.getCall(0).args[0]).toBe('contact.1');
        expect(result).toBe(contact);
      });
      it('should return undefined when no id supplied', function () {
        var result = ContactDataStore.getContact();
        expect(CacheService.get.called).toBe(false);
        expect(result).toBe(undefined);
      });

    });
    describe('removeContact', function () {
      beforeEach(function(){
        sinon.stub(CacheService, 'delete');
        sinon.stub(Dispatcher, 'publish');
      });

      it('should remove contact from local cache when id supplied, then publish event contact:item:removed', function () {
        ContactDataStore.removeContact(contact);
        expect(CacheService.delete.getCall(0).args[0]).toBe('contact.1');
        expect(Dispatcher.publish.getCall(0).args[0]).toBe('contact:item:removed');
      });
      it('should return when no id supplied', function () {
        ContactDataStore.removeContact(newContact);
        expect(CacheService.delete.called).toBe(false);
        expect(Dispatcher.publish.called).toBe(false);
      });
    });
    describe('updateContact', function () {
      beforeEach(function(){
        sinon.stub(CacheService, 'put');
        sinon.stub(Dispatcher, 'publish');
      });

      it('should update contact in local cache when id supplied, then publish event contact:item:updated', function () {
        ContactDataStore.updateContact(contact);
        expect(CacheService.put.getCall(0).args[0]).toBe('contact.1');
        expect(Dispatcher.publish.getCall(0).args[0]).toBe('contact:item:updated');
      });
      it('should return when no id supplied', function () {
        ContactDataStore.updateContact(newContact);
        expect(CacheService.put.called).toBe(false);
        expect(Dispatcher.publish.called).toBe(false);
      });
    });
    describe('addContact', function () {
      beforeEach(function(){
        sinon.stub(CacheService, 'put');
        sinon.stub(CacheService, 'getCountByPrefix').returns(2);
        sinon.stub(Dispatcher, 'publish');
      });

      it('should add contact to local cache with a new id, then publish event contact:item:added', function () {
        ContactDataStore.addContact(newContact);
        expect(CacheService.put.getCall(0).args[0]).toBe('contact.3');
        expect(Dispatcher.publish.getCall(0).args[0]).toBe('contact:item:added');
      });
      it('should return when no item supplied', function () {
        ContactDataStore.addContact();
        expect(CacheService.put.called).toBe(false);
        expect(Dispatcher.publish.called).toBe(false);
      });
    });
  });

})();
