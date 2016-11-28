'use strict';

export default class UserHistoryController {

  historyRequests = [];
  personid = '197001011234';
  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.getAllRequests();
  }

  getAllRequests() {
    this.$http.get('/api/requests/person/' + this.personid)
      .then(response => {
        console.log('history',response.data.history);
        this.historyRequests = response.data.history;
      });
  }
}
