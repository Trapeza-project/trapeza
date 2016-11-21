'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  menu = [{
    title: 'Pending Requests',
    state: 'userPendingRequests'
  }, {
    title: 'Permission Settings',
    state: 'userPermissionSettings'
  },{
    title: 'History',
    state: 'userHistory'
  }];

  isCollapsed = true;

  constructor(Auth) {
    'ngInject';

    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

}

export default angular.module('directives.navbarUserInterface', [])
  .component('navbarUserInterface', {
    template: require('./navbarUserInterface.html'),
    controller: NavbarComponent
  })
  .name;
