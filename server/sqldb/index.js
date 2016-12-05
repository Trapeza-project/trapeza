/**
 * Sequelize initialization module
 */

'use strict';

import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
  Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.ModuleSetting = db.sequelize.import('../api/moduleSetting/moduleSetting.model');
db.AdminLog = db.sequelize.import('../api/admin/adminlog.model');
db.AdminLogin = db.sequelize.import('../api/admin/adminlogin.model');
db.Datalog = db.sequelize.import('../api/data/datalog.model');
db.BasicData = db.sequelize.import('../api/data/basic.model');
db.FinancialData = db.sequelize.import('../api/data/financial.model');
db.EducationalData = db.sequelize.import('../api/data/educational.model');
db.Infotype = db.sequelize.import('../api/infotype/infotype.model');
db.Actor = db.sequelize.import('../api/actor/actor.model');
db.RequestLog = db.sequelize.import('../api/request/requestlog.model');
db.PendingRequest = db.sequelize.import('../api/request/pendingrequest.model');
db.PreviousRequest = db.sequelize.import('../api/request/previousrequest.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');
db.CustomerUser = db.sequelize.import('../api/customeruser/user.model');

db.Accessrights = db.sequelize.import('../common_models/accessrights.model');
db.Tablemapper = db.sequelize.import('../common_models/tablemapper.model');
db.Whitelist = db.sequelize.import('../common_models/whitelist.model');

module.exports = db;
