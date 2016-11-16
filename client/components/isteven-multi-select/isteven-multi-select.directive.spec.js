'use strict';

describe('Directive: istevenMultiSelect', function() {
  // load the directive's module
  beforeEach(module('trapezaApp.isteven-multi-select'));

  var element,
    scope;

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function($compile) {
    element = angular.element('<isteven-multi-select></isteven-multi-select>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the istevenMultiSelect directive');
  }));
});
