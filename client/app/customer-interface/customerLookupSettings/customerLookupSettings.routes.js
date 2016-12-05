'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('customerLookupSettings', {
      url: '/customer/lookup-settings',
      template: '<customer-lookup-settings></customer-lookup-settings>'
    });
}
