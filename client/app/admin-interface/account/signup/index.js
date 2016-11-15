'use strict';

import angular from 'angular';
import AdminSignupController from './signup.controller.js';

export default angular.module('trapezaApp.adminSignup', [])
  .controller('AdminSignupController', AdminSignupController)
  .name;
