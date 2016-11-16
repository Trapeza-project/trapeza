'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class HeaderComponent {
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

export default angular.module('directives.headerAdminInterface', [])
    .component('headerAdminInterface', {
        template: require('./headerAdminInterface.html'),
        controller: HeaderComponent
    })
    .name;
