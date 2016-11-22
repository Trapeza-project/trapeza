'use strict';
const angular = require('angular');
const $ = require('jquery');
const uiRouter = require('angular-ui-router');

import routes from './adminUserSearch.routes';

export class AdminUserSearchComponent {
  searchText = "";
  showResult = false;
  basicInfo = {};
  educationalInfo = {};
  financialInfo = {};
  latestActivity = [];
  checkupHistory = [];
  noResult = false;
  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;

  }

  validate(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var regex = /[0-9]|\./;
    if (!regex.test(key) || this.searchText.length >= 12) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
    if(theEvent.keyCode === 13 && this.searchText.length == 12){
      this.search();
    }

  }
  search() {
    console.log('search', this.searchText);
    if(this.searchText.length < 12) {
      this.showResult = false;
      return;
    }
    //Get basic data
    this.$http.get('/api/datas/data/' + this.searchText)
      .then(response => {
        console.log('basic data', response.data);
        if($.isEmptyObject(response.data.basic)) {
          this.noResult = true;
          this.showResult = false;
          return;
        }
        else {
          this.basicInfo = response.data.basic;
          this.educationalInfo = response.data.educational;
          this.financialInfo = response.data.financial;
          this.showResult = true;
          this.noResult = false;
        }

      }, error => {
        console.log('error lookup person', error);
        this.noResult = true;
      });
    //Get latest activity
    this.$http.get('/api/datas/user/' + this.searchText)
      .then(response => {
        this.latestActivity = response.data;
        for(var i = 0; i < this.latestActivity.length; i++) {
          this.latestActivity[i].infoids = JSON.parse(this.latestActivity[i].infoids);
        }
        console.log('latest activity', this.latestActivity);
        this.showResult = true;
        this.noResult = false;
      }, error => {
        console.log('error getting latest activity', error);
        this.noResult = true;
      });

    //Get checkup histoty
    this.$http.get('/api/requests/person/' + this.searchText)
      .then(response => {
        console.log('check up history', response.data);
        this.checkupHistory = response.data.history;
        this.showResult = true;
        this.noResult = false;
      }, error => {
        console.log('error getting check up history', error);
        this.noResult = true;
      });
  }
}

export default angular.module('trapezaApp.adminUserSearch', [uiRouter])
  .config(routes)
  .component('adminUserSearch', {
    template: require('./adminUserSearch.html'),
    controller: AdminUserSearchComponent,
    controllerAs: 'adminUserSearchCtrl'
  })
  .name;
