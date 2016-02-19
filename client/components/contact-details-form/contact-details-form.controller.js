(function () {

  'use strict';

  angular
    .module('AddressBookApp')
    .controller('ContactDetailsFormController', ContactDetailsFormController);

  ContactDetailsFormController.$inject = ['RoutingService', 'ContactDataStore', 'LocaleService', 'Dispatcher'];

  function ContactDetailsFormController(RoutingService, ContactDataStore, LocaleService, Dispatcher) {
    var
      that = this,
      idParameter;


    this.save = function (isValid) {
      if (isValid && !this.isNew() && that.contact){
        ContactDataStore.updateContact(that.contact);
      } else if (isValid && that.contact){
        ContactDataStore.addContact(that.contact);
      }
    };

    this.isNew = function(){
      return (idParameter === 'new');
    };

    this.cancel = function () {
      Dispatcher.publish('cancel:detail:form');
    };

    this.delete = function () {
      if (that.contact && !this.isNew()) {
        ContactDataStore.removeContact(that.contact);
      }
    };

    var init = function() {
      idParameter = RoutingService.getIdUrlParam();
      if (!that.isNew() && idParameter){
        that.contact = ContactDataStore.getContact(idParameter);
      }
      LocaleService.getCountryNames()
        .then(function (names) {
          that.countryList = names;
        });

    };

    init();

  }

})();
