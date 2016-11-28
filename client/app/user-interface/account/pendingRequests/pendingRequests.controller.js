'use strict';

export default class UserPendingRequestsController {

  personid = '197001011234';
  pendingRequests = [];
  singleShowInfo = {};
  toggleCompanyInfo = false;
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.getPendingRequests();
  }

  getPendingRequests() {
    this.$http.get('/api/requests/personpending/' + this.personid)
      .then(response => {
        console.log(response.data.history);
        this.pendingRequests = response.data.history;
      });
  }

  getSingleRequestInfo(index) {
    console.log(index);

    this.singleShowInfo = this.pendingRequests[index];
    console.log(this.singleShowInfo);
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
