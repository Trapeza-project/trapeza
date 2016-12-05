'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('adminUserSearch', {
      url: '/admin/user-search',
      template: '<admin-user-search></admin-user-search>'
    });
}
