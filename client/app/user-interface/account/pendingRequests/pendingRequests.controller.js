'use strict';

export default class UserPendingRequestsController {

  personid = '111111111111';
  toggleCompanyInfo = false;
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.getPendingRequests();
  }

  getPendingRequests() {
    this.$http.get('/api/requests/personpending/' + this.personid)
      .then(response => {
        console.log(response.data);
      });
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
