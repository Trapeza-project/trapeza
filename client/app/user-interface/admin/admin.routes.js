'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('userAdmin', {
    url: '/user/admin',
    template: require('./admin.html'),
    controller: 'AdminController',
    controllerAs: 'admin',
    authenticate: 'admin'
  });
}
