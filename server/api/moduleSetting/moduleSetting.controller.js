/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/moduleSettings              ->  index
 * POST    /api/moduleSettings              ->  create
 * GET     /api/moduleSettings/:id          ->  show
 * PUT     /api/moduleSettings/:id          ->  upsert
 * PATCH   /api/moduleSettings/:id          ->  patch
 * DELETE  /api/moduleSettings/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {ModuleSetting} from '../../sqldb';
import {Infotype} from '../../sqldb';
import Sequelize from 'sequelize';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.destroy()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of ModuleSettings
export function index(req, res) {
  return ModuleSetting.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets ModuleSetting for a single user from the DB
export function show(req, res) {
  var modules = [];
  return ModuleSetting.findAll(/*{
    where: {
	  $or: [{creatorid: req.params.id}, {creatorid: 0}]
    }
  }*/).mapSeries(function(module){
		var dataValues = module.dataValues;
		var tempModule = {};
		tempModule.id = dataValues.moduleid;
		tempModule.name = dataValues.modulename;
		tempModule.active = dataValues.active;
		tempModule.UCHandle = dataValues.UCHandle;
		tempModule.description = dataValues.description;
		tempModule.customized = true;
		if(dataValues.creatorid == 0){
			tempModule.customized = false;
		}
	  var infoids = JSON.parse(dataValues.infoids);
	  var tempids = [];
	  var promises = [];
	  infoids.forEach(function(id){
			promises.push(Infotype.find({
				where: {
					infoid : id
				}
			}).then(function(info){
				if(info == null){
					return;
				}
				var infoValues = info.dataValues;
				var infoObj = {};
				infoObj.price = infoValues.price;
				infoObj.name = infoValues.infoname;
				infoObj.id = infoValues.infoid;
				tempids.push(infoObj);
			}))
		})
		
		return Sequelize.Promise.all(promises).then(function(){
				tempModule.info = tempids;
				modules.push(tempModule);
		})  
	  }).then(function(){
		   res.json(modules);
		 })
}

// Creates a new ModuleSetting in the DB
export function create(req, res) {
	var tempModule = {};
	tempModule.info=req.body.info;
	tempModule.active = req.body.active;
	tempModule.name=req.body.name;
	tempModule.description = req.body.description;
	tempModule.UCHandle = req.body.UCHandle;
	tempModule.customized = true;
	var infoids  = [];
	for(var i = 0; i < req.body.info.length; i++){
		infoids.push(req.body.info[i].id);
	}
	var entry = ModuleSetting.build();
	entry.setDataValue('infoids', JSON.stringify(infoids));
	entry.setDataValue('active', req.body.active);
	entry.setDataValue('modulename', req.body.name);
	entry.setDataValue('description', req.body.description);
	entry.setDataValue('creatorid', req.body.accessor);
	entry.setDataValue('UCHandle', req.body.UCHandle);
	return entry.save()
    .then(function(result){
			tempModule.id = result.dataValues.moduleid;
			res.json(tempModule);
		})
}

// Upserts the given ModuleSetting in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return ModuleSetting.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing ModuleSetting in the DB
export function patch(req, res) {
var tempModule = {};
	tempModule.info=req.body.info;
	tempModule.active = req.body.active;
	tempModule.name=req.body.name;
	tempModule.description = req.body.description;
	tempModule.UCHandle = req.body.UCHandle;
	tempModule.customized = true;
	tempModule.id = req.body.id;
	var infoids  = [];
	for(var i = 0; i < req.body.info.length; i++){
		infoids.push(req.body.info[i].id);
	}
	ModuleSetting.find({ where: { moduleid: id } })
  .on('success', function (module) {
    // Check if record exists in db
    if (module) {
      module.updateAttributes({
		  infoids : JSON.stringify(infoids),
		  active : req.body.active,
		  modulename : req.body.name,
		  description : req.body.description,
		  UCHandle : req.body.UCHandle
	}).then(function(){
		res.json(tempModule);
	})
    }
  })
		
}

// Deletes a ModuleSetting from the DB
export function destroy(req, res) {
  return ModuleSetting.find({
    where: {
      moduleid: req.params.moduleid
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
