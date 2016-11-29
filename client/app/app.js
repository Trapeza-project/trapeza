'use strict';

import jquery from 'jquery';
import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import ngMaterial from 'angular-material';
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
import navbar from '../components/navbar/navbar.directive';

// User interface
import navbarUserInterface from '../components/navbarUserInterface/navbarUserInterface.component';
import footerUserInterface from '../components/footerUserInferface/footerUserInterface.component';
import userInterfaceAdmin from './user-interface/admin';
import userInterfaceStart from './user-interface/userStartPage/userStartPage.component';
import userInterfaceAccount from './user-interface/account';
import userCompanyInfo from './user-interface/userCompanyInfo/userCompanyInfo.component';

// Admin interface
import adminInterfaceDashboard from './admin-interface/adminDashboard/adminDashboard.component';
import adminInterfaceUserSearch from './admin-interface/adminUserSearch/adminUserSearch.component';
import navbarAdminInterface from '../components/navbarAdminInterface/navbarAdminInterface.component';
import headerAdminInterface from '../components/headerAdminInterface/headerAdminInterface.component';
import footerAdminInterface from '../components/footerAdminInterface/footerAdminInterface.component';
import adminInterfaceAdmin from './admin-interface/admin';
import adminInterfaceAccount from './admin-interface/account';

// Customer interface components
import navbarCustomerInterface from '../components/navbarCustomerInterface/navbarCustomerInterface.component';
import footerCustomerInterface from '../components/footerCustomerInterface/footerCustomerInterface.component';
import customerInterfaceMain from './customer-interface/customerMain/customerMain.component';
import customerInterfaceLookup from './customer-interface/customerLookup/customerLookup.component';
import customerInterfaceLookupSettings from './customer-interface/customerLookupSettings/customerLookupSettings.component';
import customerInterfaceActivity from './customer-interface/customerActivity/customerActivity.component';
import customerInterfaceRequest from './customer-interface/customerRequest/customerRequest.component';
import customerInterfaceActor from './customer-interface/customerActor/customerActor.component';
import customerInterfaceAdmin from './customer-interface/admin';
import customerInterfaceAccount from './customer-interface/account';

import customerLookupService from '../components/lookupService/lookupService.service';
import customerModalService from '../components/modalService/modalService.service';
import customerMultiSelect from '../components/isteven-multi-select/isteven-multi-select.directive';

import './app.scss';

angular.module('trapezaApp', [ngCookies, ngResource, ngSanitize, ngMaterial, 'btford.socket-io', uiRouter, uiBootstrap, _Auth,
  userInterfaceAccount,
  userInterfaceAdmin,
  userInterfaceStart,
  userCompanyInfo,
  adminInterfaceDashboard,
  adminInterfaceUserSearch,
  adminInterfaceAdmin,
  adminInterfaceAccount,
  customerInterfaceMain,
  customerInterfaceLookup,
  customerInterfaceActivity,
  customerInterfaceLookupSettings,
  customerInterfaceRequest,
  customerInterfaceActor,
  customerInterfaceAccount,
  customerInterfaceAdmin,
  customerLookupService,
  customerModalService,
  customerMultiSelect,
  navbarUserInterface,
  navbarAdminInterface,
  headerAdminInterface,
  navbarCustomerInterface,
  footerAdminInterface,
  footerUserInterface,
  footerCustomerInterface,
  constants,
  socket,
  util,
  navbar
])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    window.$ = window.jQuery = jquery;

    $rootScope.userInterface = false;
    $rootScope.customerInterface = false;
    $rootScope.adminInterface = false;

    var user = new RegExp("/user/");
    var admin = new RegExp("/admin/");
    var customer = new RegExp("/customer/");

    $rootScope.$on('$stateChangeStart', function(event, next) {
      if(user.test(window.location.pathname)) {
        $rootScope.userInterface = true;
        $rootScope.customerInterface = false;
        $rootScope.adminInterface = false;
      }
      if(customer.test(window.location.pathname)) {
        $rootScope.userInterface = false;
        $rootScope.customerInterface = true;
        $rootScope.adminInterface = false;
      }
      if(admin.test(window.location.pathname)) {
        $rootScope.userInterface = false;
        $rootScope.customerInterface = false;
        $rootScope.adminInterface = true;
      }
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
