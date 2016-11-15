'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('customerLogin', {
    url: '/customer/login',
    template: require('./login/login.html'),
    controller: 'CustomerLoginController',
    controllerAs: 'vm'
  })
    .state('customerLogout', {
      url: '/customer/logout?referrer',
      referrer: 'customerLogin',
      template: '',
      controller($state, Auth) {
        'ngInject';

        var referrer = $state.params.referrer || $state.current.referrer || 'customerLogin';
        Auth.logout();
        $state.go(referrer);
      }
    })
    .state('customerSignup', {
      url: '/customer/signup',
      template: require('./signup/signup.html'),
      controller: 'CustomerSignupController',
      controllerAs: 'vm'
    })
    .state('customerSettings', {
      url: '/customer/settings',
      template: require('./settings/settings.html'),
      controller: 'CustomerSettingsController',
      controllerAs: 'vm',
      authenticate: true
    });
}
