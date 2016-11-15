'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './adminUserSearch.routes';

export class AdminUserSearchComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('trapezaApp.adminUserSearch', [uiRouter])
  .config(routes)
  .component('adminUserSearch', {
    template: require('./adminUserSearch.html'),
    controller: AdminUserSearchComponent,
    controllerAs: 'adminUserSearchCtrl'
  })
  .name;
