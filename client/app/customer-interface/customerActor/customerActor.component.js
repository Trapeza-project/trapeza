'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './customerActor.routes';

export class CustomerActorComponent {
  /*@ngInject*/
  constructor($http, $scope, $location, lookupService) {
    this.$http = $http;
    this.actorid = lookupService.getActiveActorID();

    this.$http({
      url: '/api/actors/id',
      method: "GET",
      params: {id: this.actorid}
    }).then(response => {
      if(response.status==200){;
        this.actor = response.data;
      }
    });
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
