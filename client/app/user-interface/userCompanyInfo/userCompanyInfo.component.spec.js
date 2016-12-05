'use strict';

describe('Component: UserCompanyInfoComponent', function() {
  // load the controller's module
  beforeEach(module('trapezaApp.userCompanyInfo'));

  var UserCompanyInfoComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    UserCompanyInfoComponent = $componentController('userCompanyInfo', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
