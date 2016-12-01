'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './adminDashboard.routes';

export class AdminDashboardComponent {


    numberOfRequest = 5;
    //numberOfCheckups = 10;

    latestCheckups = null;
    latestUpdates = null;

    /*@ngInject*/
    constructor($http, $state, lookupService) {
		this.lookupService = lookupService;
        this.$http = $http;
		this.$state = $state;

        this.getLatestCheckups();
        this.getLatestUpdates();
    }


    $onInit(){}

    getLatestCheckups() {
      this.$http.get('/api/requests/all')
        .then(response => {
          console.log(response.data.history);
          this.latestCheckups = response.data.history;
        });
    }

    getLatestUpdates() {
      this.$http.get('/api/datas/all/' + this.numberOfRequest)
        .then(response => {
          console.log(response.data);
          this.latestUpdates = response.data;
        });
    }
	
	openPerson(id){
		this.lookupService.setActivePerson(id);
		this.$state.go('adminUserSearch');
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
