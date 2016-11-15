'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './customerActivity.routes';

export class CustomerActivityComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('trapezaApp.customerActivity', [uiRouter])
  .config(routes)
  .component('customerActivity', {
    template: require('./customerActivity.html'),
    controller: CustomerActivityComponent,
    controllerAs: 'customerActivityCtrl'
  })
  .name;
