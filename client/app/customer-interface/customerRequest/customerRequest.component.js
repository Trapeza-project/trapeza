'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './customerRequest.routes';

export class CustomerRequestComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('trapezaApp.customerRequest', [uiRouter])
  .config(routes)
  .component('customerRequest', {
    template: require('./customerRequest.html'),
    controller: CustomerRequestComponent,
    controllerAs: 'customerRequestCtrl'
  })
  .name;
