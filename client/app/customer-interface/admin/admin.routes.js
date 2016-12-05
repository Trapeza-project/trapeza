'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('customerAdmin', {
    url: '/customer/admin',
    template: require('./admin.html'),
    controller: 'AdminController',
    controllerAs: 'admin',
    authenticate: 'admin'
  });
}
