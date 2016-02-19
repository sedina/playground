/**
 * Store for Contacts domain.
 * */
(function () {

  'use strict';


  angular
    .module('AddressBookApp')
    .service('ContactDataStore', ContactDataStore);

  ContactDataStore.$inject = ['CacheService', 'Dispatcher'];


  function ContactDataStore(CacheService, Dispatcher) {

    var
      cacheKeyPrefix = 'contact.',
      initialized = false;

    function addItemsToCache(element) {
      CacheService.put(cacheKeyPrefix + element.id, element);
    }

    function getContacts() {
      return CacheService.getAllByPrefix(cacheKeyPrefix);
    }


    function getContact(contactId) {
      return (contactId)? CacheService.get(cacheKeyPrefix + contactId) : undefined;
    }

    function removeContact(item) {
      if (item && item.id){
        CacheService.delete(cacheKeyPrefix + item.id);
        Dispatcher.publish('contact:item:removed');
      }
    }

    function updateContact(item) {
      if (item && item.id) {
        CacheService.put(cacheKeyPrefix + item.id, item);
        Dispatcher.publish('contact:item:updated');
      }
    }

    function addContact(item) {
      if (item) {
        var newId = CacheService.getCountByPrefix(cacheKeyPrefix) + 1;
        item.id = newId;
        CacheService.put(cacheKeyPrefix + item.id, item);
        Dispatcher.publish('contact:item:added', {newId: item.id});
      }
    }

    function init(data){
      if(!initialized && data){
        data.forEach(addItemsToCache);
        initialized = true;
      }
    }


    return {
      init: init,
      getContacts: getContacts,
      getContact: getContact,
      removeContact: removeContact,
      updateContact: updateContact,
      addContact: addContact
    };

  }


})();
