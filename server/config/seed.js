/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var User = sqldb.CustomerUser;
var ModuleSettings = sqldb.ModuleSetting;
var Infotype = sqldb.Infotype;
var BasicData = sqldb.BasicData;
var FinancialData = sqldb.FinancialData;
var EducationalData = sqldb.EducationalData;
var Actor = sqldb.Actor;
var PreviousRequest = sqldb.PreviousRequest;
var Datalog = sqldb.Datalog;

User.sync()
  .then(() => User.destroy({ where: {} }))
  .then(() => {
    User.bulkCreate([{
        provider: 'local',
        name: 'Anna Svensson',
        email: 'anna.svensson@gmail.com',
        password: 'test',
        accessid:1
    },{
      provider: 'local',
      name: 'Michael Ericsson',
      email: 'michael@trapeza.com',
      password: 'test',
	    accessid:1
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin',
	    accessid:1
    }])
    .then(() => {
      console.log('finished populating users');
    });
  });

ModuleSettings.sync()
.then(() => ModuleSettings.destroy({ where: {} }))
.then(() => {
  ModuleSettings.bulkCreate([{
    moduleid:1,
    creatorid:0,
    modulename:"Quick Lookup",
    description:"Includes the basic information to the lookup.",
    infoids:'[1,2]',
    active: true,
    UCHandle: true
  }, {
    moduleid:2,
    creatorid:0,
    modulename:"Business Lookup",
    description:"Includes the basic and personal information to the lookup.",
    infoids:'[1,2,6]',
    active: true,
    UCHandle: true
  }, {
    moduleid:3,
    creatorid:0,
    modulename:"Premium Lookup",
    description:"Includes detailed information to the lookup.",
    infoids:'[1,2,6,13]',
    active: true,
    UCHandle: true
  }])
  .then(() => {
    console.log('finished populating modules');
  });
});


Infotype.sync()
  .then(() => Infotype.destroy({ where: {} }))
  .then(() => {
    Infotype.bulkCreate([{
      infoid: 1,
      infoname: 'Income',
      infotype: 'Financial',
      price: 10
    }, {
      infoid: 2,
      infoname: 'Address',
      infotype: 'Basic',
      price: 2
    },{
      infoid: 3,
      infoname: 'Degree',
      infotype: 'Educational',
      price: 5
    },{
      infoid: 4,
      infoname: 'Name',
      infotype: 'Basic',
      price: 0
    },{
      infoid: 5,
      infoname: 'Birthdate',
      infotype: 'Basic',
      price: 1
    },{
      infoid: 6,
      infoname: 'Allowance',
      infotype: 'Financial',
      price: 5
    },{
      infoid: 7,
      infoname: 'Taxable Income',
      infotype: 'Financial',
      price: 5
    },{
      infoid: 8,
      infoname: 'Interest Income',
      infotype: 'Financial',
      price: 5
    },{
      infoid: 9,
      infoname: 'Pension Contribution',
      infotype: 'Financial',
      price: 5
    },{
      infoid: 10,
      infoname: 'Benefits',
      infotype: 'Financial',
      price: 5
    },{
      infoid: 11,
      infoname: 'Occupational',
      infotype: 'Financial',
      price: 5
    },{
      infoid: 12,
      infoname: 'Business',
      infotype: 'Financial',
      price: 5
    },{
      infoid: 13,
      infoname: 'Property Tax',
      infotype: 'Financial',
      price: 5
    }])
    .then(() => {
      console.log('finished populating infotypes');
    });
  });

BasicData.sync()
  .then(() => BasicData.destroy({ where: {} }))
  .then(() => {
    BasicData.bulkCreate([{
      personid: 198601011234,
      firstname: "Anna",
      lastname: "Svensson",
      address: "Sveavägen 14",
	  birthdate:"1986-01-01"
    }, {
      personid: 222222222222,
      firstname: "Anna",
      lastname: "Karlsson",
      address: "Sveavägen 17",
	  birthdate:"1979-01-01"
    }, {
      personid: 333333333333,
      firstname: "Lisa",
      lastname: "Andersson",
      address: "Sveavägen 20",
	  birthdate:"1982-01-01"
    }])
    .then(() => {
      console.log('finished populating basic data');
    });
  });

FinancialData.sync()
  .then(() => FinancialData.destroy({ where: {} }))
  .then(() => {
    FinancialData.bulkCreate([{
      personid: 198601011234,
	    income: 25000,
		allowance: 10000,
		taxableIncome: 10000,
		interestIncome: 5000,
		pensionContribution: 3500,
		benefits: 2000,
		occupational: 2000,
		business: 15000,
		propertytax: 8000
    }, {
      personid: 222222222222,
	    income: 20000,
		allowance: 2000,
		taxableIncome: 2000,
		interestIncome: 5500,
		pensionContribution: 3500,
		benefits: 2000,
		occupational: 2000,
		business: 0,
		propertytax: 8000
    }, {
      personid: 333333333333,
	    income: 10000,
		allowance: 1000,
		taxableIncome: 3000,
		interestIncome: 100000,
		pensionContribution: 2000,
		benefits: 15000,
		occupational: 2000,
		business: 2000,
		propertytax: 8000
    }])
    .then(() => {
      console.log('finished populating financial data');
    });
  });

EducationalData.sync()
  .then(() => EducationalData.destroy({ where: {} }))
  .then(() => {
    EducationalData.bulkCreate([{
      personid: 198601011234,
	    degree: "PhD in Computer Science",
		  school: "KTH",
		  schoolrep: 5
    }, {
      personid: 222222222222,
	    degree: "PhD in Industrial Economics",
		school: "Chalmers",
		schoolrep: 3
    }, {
      personid: 333333333333,
	    degree: "Master in Computer Science",
		school: "Chalmers",
		schoolrep: 3
    }])
    .then(() => {
      console.log('finished populating educational data');
    });
  });

Actor.sync()
  .then(() => Actor.destroy({ where: {} }))
  .then(() => {
    Actor.bulkCreate([{
      id:2,
      name: "Media Markt",
      basicinfo: "A retail store.",
      description: "Media Markt is a German chain of stores selling consumer electronics with numerous branches throughout Europe and Asia. It is Europe's largest retailer of consumer electronics, and the second largest in the world after American retailer Best Buy.",
      branch: '["Retail","Electronics"]',
      score:0.79,
	  responsible: "Anders Andersson"
    }, {
      id:1,
      name: "Trapeza Creators",
      basicinfo: "556837-0000",
      description: "The company will both wholesale and retail level, buying and selling, import and export of software and hardware for computers, electronics and electronic equipment, photography, video and audio, as well as spare parts and accessories related to installation, repair and maintain such equipment.",
      branch: '["Retail sale", "Image", "Sound"]',
      score:0.95,
	    responsible: "Michelle Cañada, michelle@trapeza.com"
    }])
    .then(() => {
      console.log('finished populating actors');
    });
  });

PreviousRequest.sync()
  .then(() => PreviousRequest.destroy({ where: {} }))
  .then(() => {
    PreviousRequest.bulkCreate([{
      requestid: 7,
      infoids: '[1,2,3]',
      timetolive: 10,
      allow: true,
      companyapprove: false,
      companypending: true,
      data: "<div class='weak-border-bottom'><h4 class='textborderbottom'>Personal</h4><p class='fontbold'>Address</p><p>Sveavägen 12</p><p class='fontbold inlineblock'>Latest change: </p><p class='inlineblock'>1/1/2015</p><h4 class='textborderbottom'>Economical</h4><p class='fontbold'>Income</p><p>50 000 SEK/month</p><p class='fontbold inlineblock'>Latest change: </p><p class='inlineblock'>1/1/2015</p></div>"
    }])
    .then(() => {
      console.log('finished populating previous requests');
    });
  });

  Datalog.sync()
  .then(() => Datalog.destroy({ where: {} }))
  .then(() => {
    Datalog.bulkCreate([{
      personid: 198601011234,
      infoids: '["Income"]',
      timestamp: new Date(2016, 11, 15, 10, 10, 10),
      provider: "Skatteverket",
      selfupload: false,
      validation: "http://www.skatteverket.se/"
    }, {
      personid: 198601011234,
      infoids: '["Name", "Address"]',
      timestamp: new Date(2016, 11, 16, 10, 10, 10),
      provider: "Skatteverket",
      selfupload: false,
      validation: "http://www.skatteverket.se/"
    }, {
      personid: 198601011234,
      infoids: '["Name", "Address"]',
      timestamp: new Date(2016, 11, 16, 10, 10, 10),
      provider: "Kronofogden",
      selfupload: false,
      validation: "http://www.kronofogden.se/"
    }, {
      personid: 198601011234,
      infoids: '["Income", "Address"]',
      timestamp: new Date(2016, 11, 16, 10, 10, 10),
      provider: "Kronofogden",
      selfupload: false,
      validation: "http://www.kronofogden.se/"
    }, {
      personid: 198601011234,
      infoids: '["Degree"]',
      timestamp: new Date(2016, 11, 16, 10, 10, 10),
      provider: "KTH",
      selfupload: false,
      validation: "http://www.kth.se/"
    }, {
      personid: 198601011234,
      infoids: '["Income", "Address"]',
      timestamp: new Date(2016, 11, 16, 10, 10, 10),
      provider: "SCB",
      selfupload: false,
      validation: "http://www.scb.se/"
    }, {
      personid: 198601011234,
      infoids: '["Income", "Address"]',
      timestamp: new Date(2016, 11, 16, 10, 10, 10),
      provider: "Handelsbanken",
      selfupload: false,
      validation: "http://www.handelsbanken.se/"
    }, {
      personid: 198601011234,
      infoids: '["Income", "Address"]',
      timestamp: new Date(2016, 11, 16, 10, 10, 10),
      provider: "UC",
      selfupload: false,
      validation: "http://www.uc.se/"
    }, {
      personid: 198601011234,
      infoids: '["Income", "Address"]',
      timestamp: new Date(2016, 11, 16, 10, 10, 10),
      provider: "Tingsrätten",
      selfupload: false,
      validation: "http://www.stockholmstingsratt.se/"
    }, {
	  	personid: 222222222222,
      infoids: '["Income", "Degree"]',
      timestamp: new Date(2016, 11, 16, 15, 10, 10),
      provider: "Kronofogden",
      selfupload: false,
      validation: "http://www.kronofogden.se/"
    }])
    .then(() => {
      console.log('finished populating datalog');
    });
  });
