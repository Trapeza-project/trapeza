'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('userLogin', {
    url: '/user/login',
    template: require('./login/login.html'),
    controller: 'UserLoginController',
    controllerAs: 'vm'
  })
    .state('userLogout', {
      url: '/user/logout?referrer',
      referrer: 'userLogin',
      template: '',
      controller($state, Auth) {
        'ngInject';

        var referrer = $state.params.referrer || $state.current.referrer || 'userLogin';
        Auth.logout();
        $state.go(referrer);
      }
    })
    .state('userSignup', {
      url: '/user/signup',
      template: require('./signup/signup.html'),
      controller: 'UserSignupController',
      controllerAs: 'vm'
    })
    .state('userSettings', {
      url: '/user/settings',
      template: require('./settings/settings.html'),
      controller: 'UserSettingsController',
      controllerAs: 'vm',
      authenticate: true
    })
    .state('userRequests', {
      url: '/user/requests',
      template: require('./requests/requests.html'),
      controller: 'UserRequestsController',
      controllerAs: 'vm',
      authenticate: true
    })
    .state('userPermissionSettings', {
      url: '/user/permissionSettings',
      template: require('./permissionSettings/permissionSettings.html'),
      controller: 'UserPermissionSettingsController',
      controllerAs: 'vm',
      authenticate: true
    });
}
