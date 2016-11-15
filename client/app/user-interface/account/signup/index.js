'use strict';

import angular from 'angular';
import UserSignupController from './signup.controller.js';

export default angular.module('trapezaApp.userSignup', [])
  .controller('UserSignupController', UserSignupController)
  .name;
