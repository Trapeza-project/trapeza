'use strict';

describe('Component: CustomerRequestComponent', function() {
  // load the controller's module
  beforeEach(module('trapezaApp.customerRequest'));

  var CustomerRequestComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CustomerRequestComponent = $componentController('customerRequest', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
