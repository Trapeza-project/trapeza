import angular from 'angular';

export class FooterComponent {}

export default angular.module('directives.footerUserInterface', [])
  .component('footerUserInterface', {
    template: require('./footerUserInterface.html'),
    controller: FooterComponent
  })
  .name;
