'use strict';
const angular = require('angular');

export default angular.module('trapezaApp.navbar', [])
  .directive('myNavbar', function(Auth) {
    return {
      template: function (tElement, tAttrs) {
        console.log(tAttrs);
        if (tAttrs) {
          if (tAttrs.type === 'user') {
            return require('./user-navbar.html');
          }
          if (tAttrs.type === 'admin') {
            return require('./admin-navbar.html');
          }
          if(tAttrs.type === 'customer') {
            return require('./customer-navbar.html');
          }
        }
      },
      restrict: 'E',
      link: function(scope, element, attrs) {
        console.log(attrs);
        if(attrs.type == 'user') {
          scope.menu = [{
            title: 'Start',
            state: 'userStartPage'
          }];

        }
        if(attrs.type == 'admin') {
          scope.menu = [{
              title: 'Dashboard',
              state: 'adminDashboard'
          }, {
            title: 'User search',
              state: 'adminUserSearch'
          }];
        }
        if(attrs.type == 'customer') {
          scope.menu = [{
            title: 'Home',
            state: 'customerMain'
          }, {
            title: 'Lookup',
            state: 'customerLookup'
          }, {
            title: 'Activity',
            state: 'customerActivity'
          }];
        }
          scope.isCollapsed = true;

          scope.isLoggedIn = Auth.isLoggedInSync;
          scope.isAdmin = Auth.isAdminSync;
          scope.getCurrentUser = Auth.getCurrentUserSync;
      }
    };
  })
  .name;
