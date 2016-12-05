'use strict';

import angular from 'angular';
import UserLoginController from './login.controller.js';

export default angular.module('trapezaApp.userLogin', [])
  .controller('UserLoginController', UserLoginController)
  .name;
