'use strict';

import angular from 'angular';
import UserPermissionSettingsController from './permissonSettings.controller';

export default angular.module('trapezaApp.userPermissionSettings', [])
  .controller('UserPermissionSettingsController', UserPermissionSettingsController)
  .name;
