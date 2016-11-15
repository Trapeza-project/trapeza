'use strict';

import angular from 'angular';
import routes from './admin.routes.js';
import AdminController from './admin.controller.js';

export default angular.module('trapezaApp.userAdmin', ['trapezaApp.auth', 'ui.router'])
  .config(routes)
  .controller('AdminController', AdminController)
  .name;
