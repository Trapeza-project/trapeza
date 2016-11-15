'use strict';

import angular from 'angular';
import UserSettingsController from './settings.controller.js';

export default angular.module('trapezaApp.userSettings', [])
  .controller('UserSettingsController', UserSettingsController)
  .name;
