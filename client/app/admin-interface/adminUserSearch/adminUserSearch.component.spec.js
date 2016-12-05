'use strict';

describe('Component: AdminUserSearchComponent', function() {
  // load the controller's module
  beforeEach(module('trapezaApp.adminUserSearch'));

  var AdminUserSearchComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AdminUserSearchComponent = $componentController('adminUserSearch', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
