'use strict';
import Chart from 'chart.js';

export default class UserRequestsController {


  personid = '198601011234';
  pendingRequests = [];
  singleShowInfo = {};
  toggleCompanyInfo = false;
  /*@ngInject*/
  constructor($http, $scope, socket, lookupService, $state) {
    this.$http = $http;
    this.socket = socket;
    this.lookupService = lookupService;
    this.$state = $state;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('pendingRequests');
    });
  }

  $onInit() {
    this.getPendingRequests();
    this.getAllRequests();
    var requestCtrl = this;
    this.socket.socket.on("lookup", function(data) {
      requestCtrl.getPendingRequests();
    });
  }

  getPendingRequests() {
    this.$http.get('/api/requests/personpending/' + this.personid)
      .then(response => {
        console.log(response.data.history);
        this.pendingRequests = response.data.history;
        //this.socket.syncUpdates('request', this.pendingRequests);
        $("#numOfRequests")[0].innerText = this.pendingRequests.length;
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

  showCompanyInfo() {
    this.lookupService.setActiveActorID(this.singleShowInfo.actor.id);
    this.$state.go("userCompanyInfo");
  }

  getAllRequests() {
    this.$http.get('/api/requests/person/' + this.personid)
      .then(response => {
        console.log('history',response.data.history);
        this.historyRequests = response.data.history;
      });
  }

  handleRequest(id, answer) {
    this.$http({
      method: 'POST',
      url: '/api/requests/useranswer',
      data: {
        requestid: id,
        answer: answer
      }
    }).then(response => {
      console.log(response.data);
      this.getPendingRequests();
      this.getAllRequests();
      this.toggleInfo();
      this.socket.socket.emit("answered:lookup", response.data);
    }, error => {

    });
  }
}
