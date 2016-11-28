'use strict';

export default class UserPermissionSettingsController {


  /*@ngInject*/
  constructor() {

    $('#allow-all-toggle' ).click(function() {
      $('.allow-all input').each(function() {
        $(this)[0].checked = true;
      });
    });

    $('#allow-trusted-toggle' ).click(function() {
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
}
