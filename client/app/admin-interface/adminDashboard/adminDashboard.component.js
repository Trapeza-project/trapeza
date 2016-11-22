'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './adminDashboard.routes';

export class AdminDashboardComponent {


      /*@ngInject*/
    constructor($http) {
        this.message = 'Hello';
        this.$http = $http;
        this.$http.get('/api/datas/')
            .then(response => {
            console.log(response.data);
        this.datas = response.data;
        })

        this.checkdatas = [{
            personid: '123123123',
            requester: 'abc',
            timestamp: '123',
            allowed: 'yes',
            data: 'data'
        }]
    }


    $onInit(){}


}

export default angular.module('trapezaApp.adminDashboard', [uiRouter])
  .config(routes)
  .component('adminDashboard', {
    template: require('./adminDashboard.html'),
    controller: AdminDashboardComponent,
    controllerAs: 'adminDashboardCtrl'
  })
  .name;
