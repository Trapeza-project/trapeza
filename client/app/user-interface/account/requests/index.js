'use strict';

import angular from 'angular';
import UserRequestsController from './requests.controller';

export default angular.module('trapezaApp.userRequests', [])
  .controller('UserRequestsController', UserRequestsController)
  .name;
