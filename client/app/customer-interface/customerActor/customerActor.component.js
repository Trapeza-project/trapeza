'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './customerActor.routes';

export class CustomerActorComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('trapezaApp.customerActor', [uiRouter])
  .config(routes)
  .component('customerActor', {
    template: require('./customerActor.html'),
    controller: CustomerActorComponent,
    controllerAs: 'customerActorCtrl'
  })
  .name;
