'use strict';

angular.module('AddressBookApp', [
    'ui.router',
    'ui.router.stateHelper',
    'ui.bootstrap',
    'pascalprecht.translate',
    'Dispatcher',
    'ngTable'
  ])
  .run(function($http, ContactDataStore){
    $http.get('contacts.json').success(function (data) {
      ContactDataStore.init(data);
    });
  })
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $translateProvider) {

    $locationProvider.html5Mode(true);
    $translateProvider.preferredLanguage('en_US');
    $translateProvider.fallbackLanguage('sv_SE');

    $translateProvider.useStaticFilesLoader({
      prefix: '/i18n/',
      suffix: '.json'
    });


  });
