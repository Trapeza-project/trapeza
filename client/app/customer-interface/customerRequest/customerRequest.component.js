'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './customerRequest.routes';

export class CustomerRequestComponent {
  requestid = 0;
  requestdata = {};
  history = [];
  requesthtml="";
  /*@ngInject*/
  constructor($timeout, $state, $scope, $http, $location, lookupService, modalService, Auth) {
    'ngInject';
	
	this.$state = $state;
	
	this.isAdmin = Auth.isAdminSync;
    this.$http = $http;
    this.$location = $location;
    this.lookupService = lookupService;
    this.modalService = modalService;
    this.requestid = lookupService.getCurrentRequestID();
    this.$http({
      url: '/api/requests/'+this.requestid,
      method: "GET"
    }).then(response => {
      if(response.status==200){
        this.requestdata = response.data.basic;
        this.$http({
          url: '/api/requests/'+this.requestdata.personid+'/10',
          method: "GET"
        }).then(response => {
          if(response.status==200){
            this.history = response.data.history;
          }
        });
      }
    });


    this.$http({
      url: '/api/datas/request/'+this.requestid,
      method: "GET"
    }).then(response => {
      if(response.status==200){
        this.requesthtml = response.data.html;
      }
    });
  }
  $onInit() {
  }

  pendingrequest(){
    if(this.requestdata.pending==true){
      return true;
    }else{
      return false;
    }
  }
  approvedrequest(){
    if(this.requestdata.allow==true && this.requestdata.pending==false){
      return true;
    }else{
      return false;
    }
  }
  deniedrequest(){
    if(this.requestdata.allow==false && this.requestdata.pending==false){
      return true;
    }else{
      return false;
    }
  }

  pendingcompanyrequest(){
    if(this.requestdata.companypending==true || this.requestdata.pending==true){
      return true;
    }else{
      return false;
    }
  }
  approvedcompanyrequest(){
    if(this.requestdata.companyallow==true && this.requestdata.companypending==false && this.requestdata.pending==false){
      return true;
    }else{
      return false;
    }
  }
  deniedcompanyrequest(){
    if(((this.requestdata.companyallow==false && this.requestdata.companypending==false) || (this.requestdata.allow == false)) && this.requestdata.pending==false){
      return true;
    }else{
      return false;
    }
  }

  displayButton(){
    if(this.isAdmin() && this.requestdata.companypending==true && !this.requestdata.UCHandle && this.requestdata.allow==true){
      return true;
    }else{
      return false;
    }
  }

  approveRequest(){
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Approve Request',
      headerText: 'Approve',
      bodyText: 'Are you sure you want to approve this request?'
    };
    var vm = this;
    this.modalService.showModal({}, modalOptions)
      .then(function (result) {
        var data = {};
        data.requestid = vm.requestid;
        data.companyallow=true;
        vm.$http.post('/api/requests/companyanswer', data)
          .then(response => {
            console.log(response);
            if(response.status==200){
              if(response.data.approve==true){
                vm.requestdata.companyallow=true;
                vm.requestdata.companypending=false;
              }
            }
          });
      });
  }
  denyRequest(){
    var modalOptions = {
      closeButtonText: 'Cancel',
      actionButtonText: 'Deny Request',
      headerText: 'Deny',
      bodyText: 'Are you sure you want to deny this request?'
    };
    var vm = this;
    this.modalService.showModal({}, modalOptions)
      .then(function (result) {
        var data = {};
        data.requestid = vm.requestid;
        data.companyallow=false;
        vm.$http.post('/api/requests/companyanswer', data)
          .then(response => {
            console.log(response);
            if(response.status==200){
              if(response.data.approve==true){
                vm.requestdata.companyallow=false;
                vm.requestdata.companypending=false;
              }
            }
          });
      });

  }

  openActor = function(id){
    this.lookupService.setActiveActorID(id);
    this.$state.go('customerCompanyInfo');
  }
}

export default angular.module('trapezaApp.customerRequest', [uiRouter])
  .config(routes)
  .component('customerRequest', {
    template: require('./customerRequest.html'),
    controller: CustomerRequestComponent,
    controllerAs: 'customerRequestCtrl'
  })
  .name;
