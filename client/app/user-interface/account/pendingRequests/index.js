'use strict';

import angular from 'angular';
import UserPendingRequestsController from './pendingRequests.controller';

export default angular.module('trapezaApp.userPendingRequests', [])
  .controller('UserPendingRequestsController', UserPendingRequestsController)
  .name;
