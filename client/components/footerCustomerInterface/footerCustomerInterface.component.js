import angular from 'angular';

export class FooterComponent {}

export default angular.module('directives.footerCustomerInterface', [])
  .component('footerCustomerInterface', {
    template: require('./footerCustomerInterface.html'),
    controller: FooterComponent
  })
  .name;
