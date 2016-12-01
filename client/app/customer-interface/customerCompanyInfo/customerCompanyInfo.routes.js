'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('customerCompanyInfo', {
      url: '/customer/customerCompanyInfo',
      template: '<customer-company-info></customer-company-info>'
    });
}
