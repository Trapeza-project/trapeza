'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './userCompanyInfo.routes';

import Chart from 'chart.js';

export class UserCompanyInfoComponent {
  companyInfo = {};

  /*@ngInject*/
  constructor(lookupService, $http) {
    this.$http = $http;
    this.actorid = lookupService.getActiveActorID();
    Chart.pluginService.register({
      afterUpdate: function (chart) {
        if (chart.config.options.elements.center) {
          var helpers = Chart.helpers;
          var centerConfig = chart.config.options.elements.center;
          var globalConfig = Chart.defaults.global;
          var ctx = chart.chart.ctx;

          var fontStyle = helpers.getValueOrDefault(centerConfig.fontStyle, globalConfig.defaultFontStyle);
          var fontFamily = helpers.getValueOrDefault(centerConfig.fontFamily, globalConfig.defaultFontFamily);

          if (centerConfig.fontSize)
            var fontSize = centerConfig.fontSize;
          // figure out the best font size, if one is not specified
          else {
            ctx.save();
            var fontSize = helpers.getValueOrDefault(centerConfig.minFontSize, 1);
            var maxFontSize = helpers.getValueOrDefault(centerConfig.maxFontSize, 256);
            var maxText = helpers.getValueOrDefault(centerConfig.maxText, centerConfig.text);

            do {
              ctx.font = helpers.fontString(fontSize, fontStyle, fontFamily);
              var textWidth = ctx.measureText(maxText).width;

              // check if it fits, is within configured limits and that we are not simply toggling back and forth
              if (textWidth < chart.innerRadius * 2 && fontSize < maxFontSize)
                fontSize += 1;
              else {
                // reverse last step
                fontSize -= 1;
                break;
              }
            } while (true)
            ctx.restore();
          }

          // save properties
          chart.center = {
            font: helpers.fontString(fontSize, fontStyle, fontFamily),
            fillStyle: helpers.getValueOrDefault(centerConfig.fontColor, globalConfig.defaultFontColor)
          };
        }
      },
      afterDraw: function (chart) {
        if (chart.center) {
          var centerConfig = chart.config.options.elements.center;
          var ctx = chart.chart.ctx;

          ctx.save();
          ctx.font = chart.center.font;
          ctx.fillStyle = chart.center.fillStyle;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
          var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
          ctx.fillText(centerConfig.text, centerX, centerY);
          ctx.restore();
        }
      }
    });

    this.config = {
      type: 'doughnut',
      data: {
        labels: [
          "Approved requests",
          "Denied requests"
        ],
        datasets: [{
          data: [300, 50],
          backgroundColor: [
            "#cedb9c",
            "#e7969c"
          ],
          hoverBackgroundColor: [
            "#b5cf6b",
            "#d6616b"
          ]
        }]
      },
      options: {
        legend: {
          display: false
        },
        elements: {
          center: {
            // the longest text that could appear in the center
            maxText: '100%',
            text: '85 / 100',
            fontColor: '#ec971f',
            fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            fontStyle: 'normal',
            // fontSize: 12,
            // if a fontSize is NOT specified, we will scale (within the below limits) maxText to take up the maximum space in the center
            // if these are not specified either, we default to 1 and 256
            minFontSize: 1,
            maxFontSize: 24
          }
        }
      }
    };
    this.getCompanyInfo();
  }

  getCompanyInfo() {
    this.$http.get('/api/actors/' + this.actorid)
      .then(response => {
        console.log(response.data);
        this.companyInfo = response.data;
        this.config.options.elements.text = this.companyInfo.score * 100 + ' %';
        var ctx = document.getElementById("myChart").getContext("2d");
        var myChart = new Chart(ctx, this.config);
      });
  }
}

export default angular.module('trapezaApp.userCompanyInfo', [uiRouter])
  .config(routes)
  .component('userCompanyInfo', {
    template: require('./userCompanyInfo.html'),
    controller: UserCompanyInfoComponent,
    controllerAs: 'userCompanyInfoCtrl'
  })
  .name;
