'use strict';

describe('Component: CustomerLookupComponent', function() {
  // load the controller's module
  beforeEach(module('trapezaApp.customerLookup'));

  var CustomerLookupComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CustomerLookupComponent = $componentController('customerLookup', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
