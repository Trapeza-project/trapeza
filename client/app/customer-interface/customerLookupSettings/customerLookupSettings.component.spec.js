'use strict';

describe('Component: CustomerLookupSettingsComponent', function() {
  // load the controller's module
  beforeEach(module('trapezaApp.customerLookupSettings'));

  var CustomerLookupSettingsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CustomerLookupSettingsComponent = $componentController('customerLookupSettings', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
