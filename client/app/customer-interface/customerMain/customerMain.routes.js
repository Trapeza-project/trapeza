'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('customerMain', {
      url: '/customer/main',
      template: '<customer-main></customer-main>'
    });
}
