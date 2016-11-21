'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './userLoginStart.routes';

export class UserLoginStartComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('trapezaApp.userLoginStart', [uiRouter])
  .config(routes)
  .component('userLoginStart', {
    template: require('./userLoginStart.html'),
    controller: UserLoginStartComponent,
    controllerAs: 'userLoginStartCtrl'
  })
  .name;
