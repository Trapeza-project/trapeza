'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('userLoginStart', {
      url: '/user/loginStart',
      template: '<user-login-start></user-login-start>'
    });
}
