'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('customerActor', {
      url: '/customer/actor',
      template: '<customer-actor></customer-actor>'
    });
}
