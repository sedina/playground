(function () {
  'use strict';

  angular
    .module('AddressBookApp')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

      /**
       * Default route
       **/
      $urlRouterProvider
        .when('/', '/contacts');

      /**
       * Default route for invalid ones
       **/
      $urlRouterProvider
        .otherwise('/');

      /**
       * Defines main layout which contains two view ports:
       * - navbar : for static navigation component
       * - content : for dynamic content
       **/

      $stateProvider
        .state('app', {
          url: '/',
          views: {
            'navbar': {
              templateUrl: 'components/navbar/navbar.html'
            },
            'content': {
              template: 'This content will be replaced by child views'
            }
          }
        })
        /**
         * Defines contactss component that will be presented
         * in main application layout
         **/
        .state('app.contact', {
          url: 'contacts',
          views: {
            'content@': {
              templateUrl: 'components/contacts/contacts.html'
            }
          },
          abstract: true
        });

    }]);
})();
