'use strict';

describe('Component: CustomerActivityComponent', function() {
  // load the controller's module
  beforeEach(module('trapezaApp.customerActivity'));

  var CustomerActivityComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CustomerActivityComponent = $componentController('customerActivity', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
