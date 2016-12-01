'use strict';

describe('Component: CustomerCompanyInfoComponent', function() {
  // load the controller's module
  beforeEach(module('trapezaApp.customerCompanyInfo'));

  var CustomerCompanyInfoComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    CustomerCompanyInfoComponent = $componentController('customerCompanyInfo', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
