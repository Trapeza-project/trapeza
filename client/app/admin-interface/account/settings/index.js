'use strict';

import angular from 'angular';
import AdminSettingsController from './settings.controller.js';

export default angular.module('trapezaApp.adminSettings', [])
  .controller('AdminSettingsController', AdminSettingsController)
  .name;
