(function () {

  'use strict';

  angular
    .module('AddressBookApp')
    .controller('ContactListController', ContactListController);

  ContactListController.$inject = ['ContactDataStore', 'RoutingService', 'Dispatcher', 'NgTableParams', '$filter'];

  function ContactListController(ContactDataStore, RoutingService, Dispatcher, NgTableParams, $filter) {
    var that = this;

    var fetchContacts = function(){
      that.contacts = ContactDataStore.getContacts();
    };

    var reloadTable = function(){
      fetchContacts();
      that.tableParams.page(1);
      that.tableParams.reload();
    };

    this.tableParams = new NgTableParams({
      page: 1, // show first page
      count: 5 // count per page
    }, {
      counts: [], //disable more than 5 items per page
      getData: function ($defer, params) {
        var filteredData = $filter('filter')(that.contacts, params.filter());
        var orderedData = params.sorting()? $filter('orderBy')(filteredData, params.orderBy()) : filteredData;
        params.total(filteredData.length);
        $defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
      }
    });


    this.isActive = function (id) {
      return RoutingService.isRouteActive(id);
    };

    var init = function() {
      Dispatcher.subscribe('contact:item:removed', reloadTable);
      Dispatcher.subscribe('contact:item:added', reloadTable);
      Dispatcher.subscribe('contact:item:updated', reloadTable);
      that.contacts = [];
      fetchContacts();

    };

    init();

  }

})();
