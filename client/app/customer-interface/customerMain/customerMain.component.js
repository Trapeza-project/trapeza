'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './customerMain.routes';

export class CustomerMainComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('trapezaApp.customerMain', [uiRouter])
  .config(routes)
  .component('customerMain', {
    template: require('./customerMain.html'),
    controller: CustomerMainComponent,
    controllerAs: 'customerMainCtrl'
  })
  .name;
