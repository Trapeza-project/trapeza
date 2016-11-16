'use strict';
const angular = require('angular');

/*@ngInject*/
export function lookupService($http) {
  // AngularJS will instantiate a singleton by calling "new" on this function
  var vm = this;
  vm.currentRequestID;

  vm.actorid = 0;
  vm.accessor = 10;
  vm.id=0;
  vm.modules = [];

  $http({
    url: '/api/settings/id',
    method: "GET",
    params: {id: vm.accessor}
  }).then(response => {
    if(response.status==200){
      vm.modules = response.data.modules;
      vm.id = vm.modules[vm.modules.length-1].id + 1;
      vm.notifyObservers();
    }
  });

  var observerCallbacks = [];

  this.registerObserverCallback = function(callback){
    observerCallbacks.push(callback);
  };

  vm.notifyObservers = function(){
    angular.forEach(observerCallbacks, function(callback){
      callback();
    });
  };

  vm.nextID = function(){
    return vm.id++;
  }

  vm.getAccessor = function(){
    return vm.accessor;
  }

  vm.changeUCStatus = function(id, bool){
    for(var i = 0; i < vm.modules.length; i++){
      if (vm.modules[i].id==id) {
        vm.modules[i].UCHandle = bool;
        break;
      }
    }
  }

  vm.getModules = function(){
    return vm.modules;
  }

  vm.addModule = function(module){
    vm.modules.push(module);
  }

  vm.removeModule = function(module){
    for(var i = 0; i < vm.modules.length; i++){
      if (vm.modules[i].id==module.id) {
        vm.modules.splice(i, 1);
        break;
      }
    }
  }

  vm.changeModule = function(module){
    for(var i = 0; i < vm.modules.length; i++){
      if(module.id==vm.modules[i].id){
        vm.modules[i].module;
        break;
      }
    }
  }

  vm.getActiveModules = function(){
    var activeModules = [];
    for(var i = 0; i < vm.modules.length; i++){
      if(vm.modules[i].active){
        activeModules.push(vm.modules[i]);
      }
    }
    return activeModules;
  }


  vm.admin = true;

  vm.isAdmin = function(){
    return vm.admin;
  }


  vm.getData = function(requestid){
    var data = {name:"Kalle Karlsson", personid:"199007071415", UCHandle:false, info:[{title:"Income", value:"50000/Month", timestamp:"1/1/2015"},{title:"Address", value:"Sveavägen 12", timestamp:"1/1/2015"}], timestamp:"01/01/2016", purpose:"Check to buy a phone.", access:"approved", companystatus:"pending"};
    return data;
  }

  vm.getCurrentRequestID = function(){
    return vm.currentRequestID;
  }

  vm.setCurrentRequestID = function(requestid){
    vm.currentRequestID = requestid;
  }

  vm.getHistory = function(pid){
    var history = [{actor:{name:"Media Markt", id:"3"}, info:["Address"], timestamp:"1/1/2015", access:"approved"}, {actor:{name:"Elgiganten", id:"4"}, info:["Address", "Income"], timestamp:"1/1/2015", access:"denied"}, {actor:{name:"Media Markt", id:"3"}, info:["Address", "Income"], timestamp:"1/1/2015", access:"approved"}];
    return history;
  }

  vm.getActiveActorID = function(){
    return vm.actorid;
  }
  vm.setActiveActorID = function(actorid){
    vm.actorid = actorid;
  }

  vm.getActor = function(id){
    var actor = {name:"Media Markt", basicinfo:"A retail store.", description:"Media Markt is a German chain of stores selling consumer electronics with numerous branches throughout Europe and Asia. It is Europe's largest retailer of consumer electronics, and the second largest in the world after American retailer Best Buy.", branch:["Retail","Electronics"]};
    return actor;
  }

  vm.getRequestHTML = function(requestid){
    var html = "<div class='weak-border-bottom'><h4 class='textborderbottom'>Personal</h4><p class='fontbold'>Address</p><p>Sveavägen 12</p><p class='fontbold inlineblock'>Latest change: </p><p class='inlineblock'>1/1/2015</p><h4 class='textborderbottom'>Economical</h4><p class='fontbold'>Income</p><p>50 000 SEK/month</p><p class='fontbold inlineblock'>Latest change: </p><p class='inlineblock'>1/1/2015</p></div>";
    return html;
  }

  vm.getDataTypes = function(){
    var datatypes = [];
    var allCat = {name:"<strong>All Information</strong>", msGroup:true};
    var financialCat = {name:"<strong>Financial</strong>", msGroup:true};
    var income = {name:"Income", id:1, price:5, ticked:false};
    var endFinancialCat = {msGroup:false};
    var educationalCat = {name:"<strong>Educational</strong>", msGroup:true};
    var degree = {name:"Degrees", id:4, price:10, ticked:false};
    var endEducationalCat = {msGroup:false};
    var endAllCat = {msGroup:false};
    datatypes.push(allCat);
    datatypes.push(financialCat);
    datatypes.push(income);
    datatypes.push(endFinancialCat);
    datatypes.push(educationalCat);
    datatypes.push(degree);
    datatypes.push(endEducationalCat);
    datatypes.push(endAllCat);
    return datatypes;
  }
}

export default angular.module('trapezaApp.lookupService', [])
  .service('lookupService', lookupService)
  .name;
