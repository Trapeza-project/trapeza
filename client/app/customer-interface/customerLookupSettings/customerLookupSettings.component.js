'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './customerLookupSettings.routes';

export class CustomerLookupSettingsComponent {
  name = "";
  description="";
  lookups = [];
  id = 0;
  modulename="Name of the lookup module";
  descriptionplaceholder="Description of lookup module";
  price = 0;
  originaltypes = [];
  datatypes = [];
  editDatatypes = [];
  chosendata = [];
  editingModule = {};
  editingname="";
  editingdescription="";
  editingprice=0;
  editingChosendata=[];

  /*@ngInject*/
  constructor($http, $location, lookupService) {
    this.$http = $http;
    this.lookupService = lookupService;
    this.lookups = lookupService.getModules();
    var vm = this;
    var updateLookups = function(){
      vm.lookups = lookupService.getModules();
    };
    lookupService.registerObserverCallback(updateLookups);

    this.$http({
      url: '/api/infotypes',
      method: "GET"
    }).then(response => {
      if(response.status==200){
        this.originaltypes = response.data.datatypes;
        this.datatypes = JSON.parse(JSON.stringify(this.originaltypes));
        this.editDatatypes = JSON.parse(JSON.stringify(this.originaltypes));
      }
    });
  }
  $onInit() {
  }

  changeStatus(lookup){
    this.lookupService.changeModule(lookup);
  }

  editModule(module){
    if(module==this.editingModule){
      this.editingModule = {};
      this.editingname="";
      this.editingdescription="";
      this.editingprice=0;
      this.editingChosendata=[];
      //this.editingChosenData=[];
      this.editing = false;
      this.editDatatypes = JSON.parse(JSON.stringify(this.originaltypes));
    }else{
      this.editingModule = module;
      this.editingname=module.name;
      this.editingdescription=module.description;
      this.editingprice=module.price;
      this.editingChosendata=module.info;
      //this.editingChosenData=module.info;
      this.editing = true;
      var temptypes = JSON.parse(JSON.stringify(this.originaltypes));
      for(var i = 0; i < temptypes.length;i++){
        for(var j = 0; j < this.editingChosendata.length;j++){
          if(temptypes[i].name == this.editingChosendata[j].name){
            temptypes[i].ticked = true;
            break;
          }
        }
      }
      this.editDatatypes = temptypes;
    }
  }

  isEditModule(module){
    if(module==this.editingModule){
      return true;
    }else{
      return false;
    }
  }

  /*updateEditingData(chosendata){
   this.editingChosendata = chosendata;
   this.editingprice = this.calculatePrice(this.editingChosendata);
   }

   updateData(chosendata){
   this.chosendata = chosendata;
   this.price = this.calculatePrice(this.chosendata);
   }*/

  emptyData(){
    if(this.chosendata.length > 0){
      return false;
    }else{
      return true;
    }
  }

  emptyEditingData(){
    if(this.editingChosendata.length > 0){
      return false;
    }else{
      return true;
    }
  }

  calculatePrice(data){
    var price = 0;
    for(var i = 0; i < data.length;i++){
      price = price + data[i].price;
    }
    return price;
  }

  addModule(){
    var module = {};
    module.name = this.name;
    module.description = this.description;
    module.price = this.price;
    module.customized = true;
    module.active = true;
    module.UCHandle = true;
    module.info=[];
    for(var i = 0; i < this.chosendata.length; i++){
      module.info.push(this.chosendata[i]);
    }
    var vm = this;
    var newLookups = function(newlookups){
      vm.lookups = newlookups;
    }
    this.lookupService.addModule(module, newLookups);
    this.chosendata = [];
    this.name = "";
    this.description = "";
    this.price = 0;
    this.datatypes = JSON.parse(JSON.stringify(this.originaltypes));
  }

  getPrice(lookup){
    var info = lookup.info;
    var price = 0;
    for(var i = 0; i < info.length;i++){
      price = price + info[i].price;
    }
    return price;
  }

  changeModule(module){
    module.name = this.editingname;
    module.description = this.editingdescription;
    module.price = this.editingprice;
    module.customized = true;
    module.info=[];
    for(var i = 0; i < this.editingChosendata.length; i++){
      module.info.push(this.editingChosendata[i]);
    }
    this.lookupService.changeModule(module);
    this.editingChosendata = [];
    //this.editingChosenData = [];
    this.editingname = "";
    this.editingdescription = "";
    this.editingprice = 0;
    this.editingModule = {};
    this.editDatatypes = JSON.parse(JSON.stringify(this.originaltypes));
  }
  deleteModule(module){
    var vm = this;
    var newLookups = function(newlookups){
      vm.lookups = newlookups;
    }
    this.lookupService.removeModule(module, newLookups);
    this.editingChosendata = [];
    //this.editingChosenData = [];
    this.editingname = "";
    this.editingdescription = "";
    this.editingprice = 0;
    this.editingModule = {};
    this.editDatatypes = JSON.parse(JSON.stringify(this.originaltypes));
  }
}

export default angular.module('trapezaApp.customerLookupSettings', [uiRouter])
  .config(routes)
  .component('customerLookupSettings', {
    template: require('./customerLookupSettings.html'),
    controller: CustomerLookupSettingsComponent,
    controllerAs: 'customerLookupSettingsCtrl'
  })
  .name;
