/**
 * Dispatcher implementation of FLUX architecture. We angularize postal.js plugin.
 * Dispatcher is event bus covering Fire and Forget and Request and Reply pattern.
 * */
(function () {
  'use strict';


  angular
    .module('Dispatcher', [])
    .service('Dispatcher', Dispatcher);

  Dispatcher.inject = [];

  /**
   * Dispatcher of FLUX architectural pattern.
   * */
  function Dispatcher() {

    /**
     * Publish message on the topic.
     * @param topic
     * @param message
     * */
    var publish = function (topic, message) {
      var envelope = {
        topic: topic,
        data: message
      };
      postal.publish(envelope);
    };

    /**
     * Subscribe to the topic.
     * @param topic
     * @param callback
     * */
    var subscribe = function (topic, callback) {
      var options = {
        topic: topic,
        callback: callback
      };
      postal.subscribe(options, callback);
    };


    return {
      publish: publish,
      subscribe: subscribe
    };
  }


})();
