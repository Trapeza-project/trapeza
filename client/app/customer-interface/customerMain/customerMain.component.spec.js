'use strict';

describe('Component: CustomerMainComponent', function() {
  // load the controller's module
  beforeEach(module('trapezaApp.customerMain'));

  var CustomerMainComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CustomerMainComponent = $componentController('customerMain', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
