'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('adminLogin', {
    url: '/admin/login',
    template: require('./login/login.html'),
    controller: 'AdminLoginController',
    controllerAs: 'vm'
  })
    .state('adminLogout', {
      url: '/admin/logout?referrer',
      referrer: 'adminLogin',
      template: '',
      controller($state, Auth) {
        'ngInject';

        var referrer = $state.params.referrer || $state.current.referrer || 'adminLogin';
        Auth.logout();
        $state.go(referrer);
      }
    })
    .state('adminSignup', {
      url: '/admin/signup',
      template: require('./signup/signup.html'),
      controller: 'AdminSignupController',
      controllerAs: 'vm'
    })
    .state('adminSettings', {
      url: '/admin/settings',
      template: require('./settings/settings.html'),
      controller: 'AdminSettingsController',
      controllerAs: 'vm',
      authenticate: true
    });
}
