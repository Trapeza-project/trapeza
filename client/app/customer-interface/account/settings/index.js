'use strict';

import angular from 'angular';
import CustomerSettingsController from './settings.controller.js';

export default angular.module('trapezaApp.customerSettings', [])
  .controller('CustomerSettingsController', CustomerSettingsController)
  .name;
