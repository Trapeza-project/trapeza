'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('customerLookup', {
      url: '/customer/lookup',
      template: '<customer-lookup></customer-lookup>'
    });
}
