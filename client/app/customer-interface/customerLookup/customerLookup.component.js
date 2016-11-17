'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './customerLookup.routes';

export class CustomerLookupComponent {

  personnumber = "yyyymmddxxxx";
  purposestring = "Purpose with lookup";
  id="";
  purpose="";
  datatypes = [];
  //chosendata = [];
  chosenInfo = [];
  modules = [];
  UCHandling = true;
  activeModule = {};
  advancedOption = false;
  price = 0;

  /*@ngInject*/
  constructor($http, $scope, $location, lookupService, Auth) {
    function temp(){
      return true;
    }
    this.lookupService = lookupService;
    this.isAdmin = temp;
    //this.isAdmin = Auth.isAdminSync;
    this.$http = $http;
    this.$location = $location;
    this.$http({
      url: '/api/infotypes',
      method: "GET"
    }).then(response => {
      if(response.status==200){
        this.datatypes = response.data.datatypes;
      }
    });
    var vm = this;
    vm.modules = vm.lookupService.getActiveModules();
    var callback = function(){
      vm.modules = vm.lookupService.getActiveModules();
    }
    this.lookupService.registerObserverCallback(callback);
  }

  submitLookup(){
    var data = {};
    var info = [];
    var price = 0;
    if(this.isModuleActive()){
      for(var i = 0; i < this.activeModule.info.length; i++){
        info.push(this.activeModule.info[i].id);
        price = price + this.activeModule.info[i].price;
      }
      data.moduleid = this.activeModule.id;
      data.purpose = "Quick Lookup";
    }else{
      for(var i = 0; i < this.chosenInfo.length; i++){
        info.push(this.chosenInfo[i].id);
        price = price + this.chosenInfo[i].price;
      }
      data.purpose = this.purpose;
    }

    data.info = info;
    data.id = this.id;
    data.price = price;
    data.accessor = this.lookupService.getAccessor();
    console.log(data);
    this.$http.post('/api/requests', data)
      .then(response => {
        if(response.status==200){
          console.log(response);
          this.lookupService.setCurrentRequestID(response.data.requestid);
          this.$location.url('/request');
        }
      });
  }

  isModuleActive() {
    if(Object.keys(this.activeModule).length === 0 && this.activeModule.constructor === Object){
      return false;
    }else{
      return true;
    }
  }

  setAdvancedOption(aOption){
    this.advancedOption = aOption;
  }

  /**updateData(cdata){
		console.log("UPPPPDATE");
        this.chosendata = cdata;
		this.price = getPrice(this.chosendata);
    }*/

  getPrice(data){
    var price = 0;
    for(var i = 0; i < data.length;i++){
      price = price + data[i].price;
    }
    return price;
  }

  showMore(){
    if(this.isAdmin() && !this.advancedOption){
      return true;
    }else{
      return false;
    }
  }

  showLess(){
    if(this.isAdmin() && this.advancedOption){
      return true;
    }else{
      return false;
    }
  }

  toggleModule(module){
    if(module==this.activeModule){
      this.activeModule={};
      this.UCHandling = true;
    }else{
      this.activeModule = module;
      if(!module.UCHandle){
        this.UCHandling = false;
      }else{
        this.UCHandling = true;
      }
    }
  }

  isActiveModule(module){
    if(module==this.activeModule){
      return true;
    }else{
      return false;
    }
  }

  buttonDisable(){
    if(((Object.keys(this.activeModule).length === 0)&&this.chosenInfo.length==0) || this.id.length != 12){
      return true;
    }else{
      return false;
    }
  }

  updateID(id){
    this.id = id;
  }
  updatePurpose(purpose){
    this.purpose = purpose;
  }
}

export default angular.module('trapezaApp.customerLookup', [uiRouter])
  .config(routes)
  .component('customerLookup', {
    template: require('./customerLookup.html'),
    controller: CustomerLookupComponent,
    controllerAs: 'customerLookupCtrl'
  })
  .name;
