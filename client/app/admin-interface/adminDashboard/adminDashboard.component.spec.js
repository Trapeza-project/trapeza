'use strict';

describe('Component: AdminDashboardComponent', function() {
  // load the controller's module
  beforeEach(module('trapezaApp.adminDashboard'));

  var AdminDashboardComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    AdminDashboardComponent = $componentController('adminDashboard', {});
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
