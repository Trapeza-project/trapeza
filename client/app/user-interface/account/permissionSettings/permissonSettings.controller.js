'use strict';

import awesomeplete from 'awesomplete';

export default class UserPermissionSettingsController {

  trustedList = [];
  actors = [];
  infoTypes = [];
  awesomplete;
  showHelp = false;
  /*@ngInject*/
  constructor($http) {

    this.$http = $http;
    this.getInfoTypes();
    this.getActors();

    this.awesomplete = new Awesomplete('#search-actor', {
      minChars: 2,
      maxItems: 10,
      autoFirst: true
    });

    $('#allow-all-toggle' ).click(function() {
      $('.allow-all input').each(function() {
        $(this)[0].checked = true;
      });
    });

    $('#allow-trusted-toggle').click(function() {
      $('.allow-trusted input').each(function() {
        $(this)[0].checked = true;
      });
    });

    $('#always-ask-toggle' ).click(function() {
      $('.always-ask input').each(function() {
        $(this)[0].checked = true;
      });
    });
  }

  getInfoTypes() {
    this.$http.get('/api/infotypes/usertypes')
      .then(response => {
        console.log(response.data);
        this.infoTypes = response.data.datatypes;
      });
  }

  getActors() {
    var that = this;
    this.$http.get('/api/actors/')
      .then(response =>
      {

        response.data.forEach(function(item) {
          that.actors.push(item.name);
        });
        this.awesomplete._list = that.actors;
        console.log('awsomplete',this.awesomplete);
      });
  }

  addToTrusted() {
    var actorToAdd = $("#search-actor")[0].value;
    if(!_.includes(this.trustedList, actorToAdd)) {
      this.trustedList.push(actorToAdd);
    }
    else {
      alert("Company already added to trusted list");
    }
  }

  removeTrusted(index) {
    this.trustedList.splice(index, 1);
  }

  toggleHelp() {
      if(this.showHelp) {
      this.showHelp = false;
    }
    else {
      this.showHelp = true;
    }
  }
}
