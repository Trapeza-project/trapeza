'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('userCompanyInfo', {
      url: '/user/companyInfo',
      template: '<user-company-info></user-company-info>'
    });
}
