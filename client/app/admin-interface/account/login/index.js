'use strict';

import angular from 'angular';
import AdminLoginController from './login.controller.js';

export default angular.module('trapezaApp.adminLogin', [])
  .controller('AdminLoginController', AdminLoginController)
  .name;
