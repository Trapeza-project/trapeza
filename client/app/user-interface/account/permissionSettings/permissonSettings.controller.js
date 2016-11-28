'use strict';

import awesomeplete from 'awesomplete';

export default class UserPermissionSettingsController {

  trustedList = [];
  actors = [];
  infoTypes = [];
  /*@ngInject*/
  constructor($http) {

    this.$http = $http;
    this.getInfoTypes();
    this.getActors();

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
        awesomeplete.list = that.actors;
        console.log(awesomeplete.list);
      });
  }

  addToTrusted() {
    console.log($("#search-actor").text());
  }
}
