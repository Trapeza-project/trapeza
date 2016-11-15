'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('adminAdmin', {
    url: '/admin/admin',
    template: require('./admin.html'),
    controller: 'AdminController',
    controllerAs: 'admin',
    authenticate: 'admin'
  });
}
