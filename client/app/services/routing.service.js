(function () {
  'use strict';

  angular
    .module('AddressBookApp')
    .service('RoutingService', RoutingService);

  RoutingService.inject = ['$location', '$stateParams','$state', 'Dispatcher'];

  function RoutingService($location, $stateParams, $state, Dispatcher) {

    var isRouteActive =  function(route){
      return ($stateParams.id === route);
    };

    var getIdUrlParam = function(){
        return $stateParams.id;
    };

    var goToContactList = function(){
      $state.go('app.contact.list');
    };

    var goToItemUrl = function(message){
      $state.go('app.contact.list.details', {id: message.newId}, {notify: false});
    };

    var init = function(){
      Dispatcher.subscribe('cancel:detail:form', goToContactList);
      Dispatcher.subscribe('contact:item:removed', goToContactList);
      Dispatcher.subscribe('contact:item:added', goToItemUrl);
    };

    init();

    return {
      isRouteActive: isRouteActive,
      getIdUrlParam: getIdUrlParam
    };
  }
})();
