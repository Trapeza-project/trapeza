'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './userStartPage.routes';

export class UserStartPageComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('trapezaApp.userStartPage', [uiRouter])
  .config(routes)
  .component('userStartPage', {
    template: require('./userStartPage.html'),
    controller: UserStartPageComponent,
    controllerAs: 'userStartPageCtrl'
  })
  .name;
