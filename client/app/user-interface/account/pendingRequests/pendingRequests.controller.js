'use strict';
import Chart from 'chart.js';

export default class UserPendingRequestsController {


  personid = '197001011234';
  pendingRequests = [];
  singleShowInfo = {};
  toggleCompanyInfo = false;
  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;


    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('pendingRequests');
    });
  }

  $onInit() {
    this.getPendingRequests();
    console.log(Chart);
  }

  getPendingRequests() {
    this.$http.get('/api/requests/personpending/' + this.personid)
      .then(response => {
        console.log(response.data.history);
        this.pendingRequests = response.data.history;
        //this.socket.syncUpdates('request', this.pendingRequests);
        $("#numOfPendingRequests")[0].innerText = this.pendingRequests.length;
      });
  }

  getSingleRequestInfo(index) {
    this.singleShowInfo = this.pendingRequests[index];
    this.toggleInfo();
  }

  toggleInfo() {
    if(this.toggleCompanyInfo) {
      this.toggleCompanyInfo = false;
    }
    else {
      this.toggleCompanyInfo = true;
    }
  }
}
