'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('customerRequest', {
      url: '/customer/request',
      template: '<customer-request></customer-request>'
    });
}
