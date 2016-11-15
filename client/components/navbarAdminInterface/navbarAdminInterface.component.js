'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  menu = [{
    title: 'Dashboard',
    state: 'adminDashboard'
  }, {
    title: 'User search',
    state: 'adminUserSearch'
  }];

  isCollapsed = true;

  constructor(Auth) {
    'ngInject';

    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

}

export default angular.module('directives.navbarAdminInterface', [])
  .component('navbarAdminInterface', {
    template: require('./navbarAdminInterface.html'),
    controller: NavbarComponent
  })
  .name;
