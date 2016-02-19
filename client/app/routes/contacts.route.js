(function () {

  'use strict';

  angular
    .module('AddressBookApp')
    .config(['$stateProvider', function ($stateProvider) {

      $stateProvider
        .state('app.contact.list', {
          url: '',
          templateUrl: 'components/contact-list/contact-list.html'
        })
        .state('app.contact.list.details', {
          url: '/:id',
          templateUrl: 'components/contact-details-form/contact-details-form.html'
        })
        .state('app.contact.list.new', {
          url: '/new',
          templateUrl: 'components/contact-details-form/contact-details-form.html'
        });
    }]);

})();
