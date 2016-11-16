'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './adminDashboard.routes';

export class AdminDashboardComponent {
    
    
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }


}

export default angular.module('trapezaApp.adminDashboard', [uiRouter])
  .config(routes)
  .component('adminDashboard', {
    template: require('./adminDashboard.html'),
    controller: AdminDashboardComponent,
    controllerAs: 'adminDashboardCtrl'
  })
  .name;
