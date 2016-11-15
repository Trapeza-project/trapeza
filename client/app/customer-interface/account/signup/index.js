'use strict';

import angular from 'angular';
import CustomerSignupController from './signup.controller.js';

export default angular.module('trapezaApp.customerSignup', [])
  .controller('CustomerSignupController', CustomerSignupController)
  .name;
