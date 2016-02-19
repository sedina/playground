(function() {

  'use strict';

  angular
    .module('AddressBookApp')
    .controller('NavbarController', NavbarController);

  NavbarController.$inject = [];

  function NavbarController() {

    var that = this;

    that.menu = [{
      'title': 'Address Book',
      'link': '/contacts'
    }];

    that.isCollapsed = true;

  }
})();



