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
        url: '/api/actors/'+this.actorid,
        method: "GET"
  }).then(response => {
      if(response.status==200){;
		console.log(response.data);
        this.actor = response.data;
      }
    });
  }
  $onInit() {
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
