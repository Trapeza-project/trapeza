'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {

  personid = '197001011234';

  menu = [{
    title: 'Permission Settings',
    state: 'userPermissionSettings',
    name: 'glyphicon glyphicon-cog'
  }];

  isCollapsed = true;

  constructor(Auth, $http) {
    'ngInject';

    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;

    $http.get('/api/requests/personpending/' + this.personid)
      .then(response => {
        console.log(response.data.history);
        this.pendingRequests = response.data.history;
        //this.socket.syncUpdates('request', this.pendingRequests);
        $("#numOfRequests")[0].innerText = this.pendingRequests.length;
      });

  }

}

export default angular.module('directives.navbarUserInterface', [])
  .component('navbarUserInterface', {
    template: require('./navbarUserInterface.html'),
    controller: NavbarComponent
  })
  .name;
