'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import 'angular-socket-io';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
// import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';


import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';

// User interface
import navbarUserInterface from '../components/navbarUserInterface/navbarUserInterface.component';
import footerUserInterface from '../components/footerUserInferface/footerUserInterface.component';
import userInterfaceAdmin from './user-interface/admin';
import userInterfaceStart from './user-interface/userStartPage/userStartPage.component';
import userInterfaceAccount from './user-interface/account';

// Admin interface
import adminInterfaceDashboard from './admin-interface/adminDashboard/adminDashboard.component';
import adminInterfaceUserSearch from './admin-interface/adminUserSearch/adminUserSearch.component';
import navbarAdminInterface from '../components/navbarAdminInterface/navbarAdminInterface.component';
import footerAdminInterface from '../components/footerAdminInterface/footerAdminInterface.component';
import adminInterfaceAdmin from './admin-interface/admin';
import adminInterfaceAccount from './admin-interface/account';

// Customer interface components
import navbarCustomerInterface from '../components/navbarCustomerInterface/navbarCustomerInterface.component';
import footerCustomerInterface from '../components/footerCustomerInterface/footerCustomerInterface.component';
import customerInterfaceMain from './customer-interface/customerMain/customerMain.component';
import customerInterfaceLookup from './customer-interface/customerLookup/customerLookup.component';
import customerInterfaceActivity from './customer-interface/customerActivity/customerActivity.component';
import customerInterfaceAdmin from './customer-interface/admin';
import customerInterfaceAccount from './customer-interface/account';

import './app.scss';

angular.module('trapezaApp', [ngCookies, ngResource, ngSanitize, 'btford.socket-io', uiRouter, uiBootstrap, _Auth,
  userInterfaceAccount,
  userInterfaceAdmin,
  userInterfaceStart,
  adminInterfaceDashboard,
  adminInterfaceUserSearch,
  adminInterfaceAdmin,
  adminInterfaceAccount,
  customerInterfaceMain,
  customerInterfaceLookup,
  customerInterfaceActivity,
  customerInterfaceAccount,
  customerInterfaceAdmin,
  navbarUserInterface,
  navbarAdminInterface,
  navbarCustomerInterface,
  footerAdminInterface,
  footerUserInterface,
  footerCustomerInterface,
  constants,
  socket,
  util
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/admin/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['trapezaApp'], {
      strictDi: true
    });
  });
