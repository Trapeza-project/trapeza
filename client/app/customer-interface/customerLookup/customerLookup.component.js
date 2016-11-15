'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './customerLookup.routes';

export class CustomerLookupComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('trapezaApp.customerLookup', [uiRouter])
  .config(routes)
  .component('customerLookup', {
    template: require('./customerLookup.html'),
    controller: CustomerLookupComponent,
    controllerAs: 'customerLookupCtrl'
  })
  .name;
