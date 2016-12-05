'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('customerActivity', {
      url: '/customer/activity',
      template: '<customer-activity></customer-activity>'
    });
}
