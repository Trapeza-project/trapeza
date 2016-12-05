'use strict';

describe('Component: CustomerActorComponent', function() {
  // load the controller's module
  beforeEach(module('trapezaApp.customerActor'));

  var CustomerActorComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CustomerActorComponent = $componentController('customerActor', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
