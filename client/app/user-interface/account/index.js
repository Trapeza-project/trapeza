'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';

import routing from './account.routes.js';
import login from './login';
import settings from './settings';
import signup from './signup';
import pendingRequests from './pendingRequests';

export default angular.module('trapezaApp.userAccount', [uiRouter, login, settings, signup, pendingRequests])
  .config(routing)
  .run(function($rootScope) {
    'ngInject';

    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
      if(next.name === 'logout' && current && current.name && !current.authenticate) {
        next.referrer = current.name;
      }
    });
  })
  .name;
