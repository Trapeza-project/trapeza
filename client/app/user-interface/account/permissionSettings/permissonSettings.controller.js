'use strict';

import awesomeplete from 'awesomplete';

export default class UserPermissionSettingsController {

  trustedList = [];
  actors = [];
  infoTypes = [];
  awesomplete;
  showHelp = false;
  radioClickCounter = 0;
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

    $('#allow-uc-toggle').click(function() {
      if($(this)[0].checked) {
        $('#settingsTable input[type=radio]').attr('disabled', false);
        $('.allow-uc input').each(function() {
            $(this)[0].checked = true;
        });
      } else {
        $('#settingsTable input[type=radio]').attr('disabled', true);
        $('.allow-uc input').each(function() {
            $(this)[0].checked = false;
        });
      }
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

    $('#always-ask-toggle').click(function() {
      $('.always-ask input').each(function() {
        $(this)[0].checked = true;
      });
    });

    $(document).ready(function(){
      $('#allow-uc-toggle').trigger('click');
      $('#allow-all-toggle').trigger('click');
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
    var actorToAdd = $('#search-actor')[0].value;
    if(!_.includes(this.trustedList, actorToAdd)) {
      this.trustedList.push(actorToAdd);
    }
    else {
      alert('Company already added to trusted list');
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

  toggleHeaderInputOff() {
    /*$(document).find('thead input[type=radio]').each(function() {
      $(this)[0].checked = false;
    });*/
  }

  toggleRow(index) {
    if($('#settingsTable tr').eq(index+1).find('input[type=checkbox]')[0].checked) {
      $('#settingsTable tr').eq(index+1).find('input[type=radio]').attr('disabled', false);
    } else {
      $('#settingsTable tr').eq(index+1).find('input[type=radio]').attr('disabled', true);
    }
    $(document).find('#allow-uc-toggle')[0].checked = false;
  }
}
