/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var Thing = sqldb.Thing;
var User = sqldb.CustomerUser;
var ModuleSettings = sqldb.ModuleSetting;
var Infotype = sqldb.Infotype;
var BasicData = sqldb.BasicData;
var Actor = sqldb.Actor;
var PreviousRequest = sqldb.PreviousRequest;

Thing.sync()
  .then(() =>
     Thing.destroy({ where: {} })
  )
  .then(() => {
    Thing.bulkCreate([{
      name: 'Development Tools',
      info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, '
            + 'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, '
            + 'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, '
            + 'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep '
            + 'tests alongside code. Automatic injection of scripts and '
            + 'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more '
            + 'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript '
            + 'payload, minifies your scripts/css/images, and rewrites asset '
            + 'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku '
            + 'and openshift subgenerators'
    }]);
  });

User.sync()
  .then(() => User.destroy({ where: {} }))
  .then(() => {
    User.bulkCreate([{
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
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
  modulename:"Small",
  description:"Includes the basic information to the lookup.",
  infoids:'[1]',
  active: true,
  UCHandle: true
}, {
  moduleid:2,
  creatorid:0,
  modulename:"Medium",
  description:"Includes the basic and personal information to the lookup.",
  infoids:'[1,2]',
  active: true,
  UCHandle: true
}, {
  moduleid:3,
  creatorid:0,
  modulename:"Large",
  description:"Includes detailed information to the lookup.",
  infoids:'[1,2,3]',
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
      infotype: 'Economic',
      price: 5
    }, {
      infoid: 2,
      infoname: 'Address',
      infotype: 'Basic',
      price: 10
    },{
      infoid: 3,
      infoname: 'Degree',
      infotype: 'Educational',
      price: 10
    }])
    .then(() => {
      console.log('finished populating infotypes');
    });
  });
  
BasicData.sync()
  .then(() => BasicData.destroy({ where: {} }))
  .then(() => {
    BasicData.bulkCreate([{
      personid: 111111111111,
	  firstname: "Kalle",
	  lastname: "Svensson",
	  address: "Sveavägen 14"
    }, {
      personid: 222222222222,
	  firstname: "Anna",
	  lastname: "Karlsson",
	  address: "Sveavägen 17"
    }, {
      personid: 333333333333,
	  firstname: "Lisa",
	  lastname: "Andersson",
	  address: "Sveavägen 20"
    }])
    .then(() => {
      console.log('finished populating basic data');
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
	  score:0.59
    }, {
	  id:1,
      name: "Trapeza Creators",
	  basicinfo: "We are creating this service.",
	  description: "We created it",
	  branch: '["Web Development","Database"]',
	  score:1
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