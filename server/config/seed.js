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
  creatorid:0,
  modulename:"Small",
  description:"Includes the basic information to the lookup.",
  infoids:'[1]',
  active: true,
  UCHandle: true
}, {
  creatorid:0,
  modulename:"Medium",
  description:"Includes the basic and personal information to the lookup.",
  infoids:'[1,2]',
  active: true,
  UCHandle: true
}, {
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