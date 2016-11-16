'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './customerActivity.routes';

export class CustomerActivityComponent {

  requests = [];
  pending = [];
  answered = [];

  /*@ngInject*/
  constructor($http, $location, lookupService) {
    this.$location = $location;
    this.lookupService = lookupService;
    var accessid = lookupService.getAccessor();
    this.$http = $http;
    this.$http({
      url: '/api/requests/accessor',
      method: "GET",
      params: {accessor: accessid}
    }).then(response => {
      if(response.status==200){
        console.log(response.data);
        this.requests = response.data;
        //this.requests = [{name:"Kalle Karlsson", info:["Income","Address"], timestamp:"01/01/2016", access:"pending", companystatus:"pending"},{name:"Stina Andersson", info:["Income","Address"], timestamp:"01/01/2016", access:"approved", companystatus:"approved"}, {name:"Eva Svensson", info:["Income","Address"], timestamp:"01/01/2016", access:"denied", companystatus:"approved"},{name:"Eva Andersson", info:["Income","Address"], timestamp:"01/01/2016", access:"approved", companystatus:"denied"},{name:"Eva Andersson", info:["Income","Address"], timestamp:"01/01/2016", access:"approved", companystatus:"pending"}];
        for(var i = 0; i < this.requests.length; i++){
          if(this.requests[i].access == "pending"){
            this.pending.push(this.requests[i]);
          }else{
            this.answered.push(this.requests[i]);
          }
        }
      }
    });
  }
  pendingrequest(request){
    if(request.access=="pending"){
      return true;
    }else{
      return false;
    }
  }
  approvedrequest(request){
    if(request.access=="approved"){
      return true;
    }else{
      return false;
    }
  }
  deniedrequest(request){
    if(request.access=="denied"){
      return true;
    }else{
      return false;
    }
  }

  pendingcompanyrequest(request){
    if(request.companystatus=="pending" && request.access != "denied"){
      return true;
    }else{
      return false;
    }
  }
  approvedcompanyrequest(request){
    if(request.companystatus=="approved" && request.access != "denied"){
      return true;
    }else{
      return false;
    }
  }
  deniedcompanyrequest(request){
    if(request.companystatus=="denied" || request.access == "denied"){
      return true;
    }else{
      return false;
    }
  }

  viewRequest(requestid){
    this.lookupService.setCurrentRequestID(requestid);
    this.$location.url('/request');
  }
}

export default angular.module('trapezaApp.customerActivity', [uiRouter])
  .config(routes)
  .component('customerActivity', {
    template: require('./customerActivity.html'),
    controller: CustomerActivityComponent,
    controllerAs: 'customerActivityCtrl'
  })
  .name;
