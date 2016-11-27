'use strict';

import angular from 'angular';
import UserHistoryController from './history.controller';

export default angular.module('trapezaApp.userHistory', [])
  .controller('UserHistoryController', UserHistoryController)
  .name;
