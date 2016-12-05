import angular from 'angular';

export class FooterComponent {}

export default angular.module('directives.footerAdminInterface', [])
  .component('footerAdminInterface', {
    template: require('./footerAdminInterface.html'),
    controller: FooterComponent
  })
  .name;
