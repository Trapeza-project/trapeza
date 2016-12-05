'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './customerMain.routes';

export class CustomerMainComponent {
  usernameplaceholder = "Username";
  passwordplaceholder = "Password";
  user = {
    name: '',
    email: '',
    password: ''
  };
  errors = {
    login: undefined
  };
  submitted = false;


  /*@ngInject*/
  constructor($http, $scope, socket, Auth, $state) {
    'ngInject';
    this.Auth = Auth;
    this.$state = $state;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.$http = $http;
  }

  $onInit() {
  }

  login(form) {
    this.submitted = true;
    if(form.$valid) {
      this.Auth.login({
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          // Logged in, redirect to home
          this.$state.go('customerMain');
        })
        .catch(err => {
          this.errors.login = err.message;
        });
    }
  }
}

export default angular.module('trapezaApp.customerMain', [uiRouter])
  .config(routes)
  .component('customerMain', {
    template: require('./customerMain.html'),
    controller: CustomerMainComponent,
    controllerAs: 'customerMainCtrl'
  })
  .name;
