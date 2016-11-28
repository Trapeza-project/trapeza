'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  menu = [{
    title: 'Home',
    state: 'customerMain'
  }, {
    title: 'Lookup',
    state: 'customerLookup'
  }, {
    title: 'Lookup History',
    state: 'customerActivity'
  }];

  isCollapsed = true;

  constructor(Auth) {
    'ngInject';

    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
  }

}

export default angular.module('directives.navbarCustomerInterface', [])
  .component('navbarCustomerInterface', {
    template: require('./navbarCustomerInterface.html'),
    controller: NavbarComponent
  })
  .name;
