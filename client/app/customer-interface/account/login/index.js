'use strict';

import angular from 'angular';
import CustomerLoginController from './login.controller.js';

export default angular.module('trapezaApp.customerLogin', [])
  .controller('CustomerLoginController', CustomerLoginController)
  .name;
