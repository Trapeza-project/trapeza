'use strict';

describe('Component: UserStartPageComponent', function() {
  // load the controller's module
  beforeEach(module('trapezaApp.userStartPage'));

  var UserStartPageComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    UserStartPageComponent = $componentController('userStartPage', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
