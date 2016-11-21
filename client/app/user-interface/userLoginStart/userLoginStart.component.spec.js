'use strict';

describe('Component: UserLoginStartComponent', function() {
  // load the controller's module
  beforeEach(module('trapezaApp.userLoginStart'));

  var UserLoginStartComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    UserLoginStartComponent = $componentController('userLoginStart', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
