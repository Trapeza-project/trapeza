'use strict';
const angular = require('angular');

/*@ngInject*/
export function modalService($uibModal) {
  // AngularJS will instantiate a singleton by calling "new" on this function
  var modalDefaults = {
    backdrop: true,
    keyboard: true,
    modalFade: true,
    templateUrl: '/app/modalService/modal.html'
  };

  var modalOptions = {
    closeButtonText: 'Close',
    actionButtonText: 'OK',
    headerText: 'Proceed?',
    bodyText: 'Perform this action?'
  };

  this.showModal = function (customModalDefaults, customModalOptions) {
    if (!customModalDefaults) customModalDefaults = {};
    customModalDefaults.backdrop = 'static';
    return this.show(customModalDefaults, customModalOptions);
  };

  this.show = function (customModalDefaults, customModalOptions) {
    //Create temp objects to work with since we're in a singleton service
    var tempModalDefaults = {};
    var tempModalOptions = {};

    //Map angular-ui modal custom defaults to modal defaults defined in service
    angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

    //Map modal.html $scope custom properties to defaults defined in service
    angular.extend(tempModalOptions, modalOptions, customModalOptions);
    if (!tempModalDefaults.controller) {

      tempCtrl.$inject = ["$scope", "$uibModalInstance"];
      tempModalDefaults.controller = tempCtrl;
    }
    return $uibModal.open(tempModalDefaults).result;
  };
  function tempCtrl ($scope, $uibModalInstance) {
    $scope.modalOptions = tempModalOptions;
    $scope.modalOptions.ok = function (result) {
      $uibModalInstance.close(result);
    };
    $scope.modalOptions.close = function (result) {
      $uibModalInstance.dismiss('cancel');
    };
  };
}

export default angular.module('trapezaApp.modalService', [])
  .service('modalService', ['$uibModal', modalService])
  .name;
