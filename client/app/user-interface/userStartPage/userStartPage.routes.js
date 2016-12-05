'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('userStartPage', {
      url: '/user/start',
      template: '<user-start-page></user-start-page>'
    });
}
