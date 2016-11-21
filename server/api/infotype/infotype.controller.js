/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/infotypes              ->  index
 * POST    /api/infotypes              ->  create
 * GET     /api/infotypes/:id          ->  show
 * PUT     /api/infotypes/:id          ->  upsert
 * PATCH   /api/infotypes/:id          ->  patch
 * DELETE  /api/infotypes/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
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

// Gets a list of Infotypes, used in customer
export function customerindex(req, res) {
	var datatypes = [];
	var allCat = {name:"<strong>All Information</strong>", msGroup:true};
	datatypes.push(allCat);
	Infotype.aggregate('infotype', 'DISTINCT', { plain: false })
    .mapSeries(function (row) { 
		var category = row.DISTINCT;
		var cat = {name:"<strong>"+category+"</strong>", msGroup:true};
		var promises = [];
		datatypes.push(cat);
		promises.push(Infotype.findAll({
				where:{
					infotype: category
				}
			}).then(function(result){
					for(var i=0; i < result.length;i++){
						var resData = result[i].dataValues;
						var info = {};
						info.name = resData.infoname;
						info.id = resData.infoid;
						info.price = resData.price;
						info.ticked = false;
						datatypes.push(info);
					}
				}
			))
			return Sequelize.Promise.all(promises).then(function(){
				datatypes.push({msGroup:false});
				promises = [];
			});
	})
    .then(function () {
		datatypes.push({msGroup:false});
		var data = {};
		data.datatypes = datatypes;
		res.json(data);
    })
}


// Gets a list of Infotypes, used in user
export function userindex(req, res) {
	var datatypes = [];
	Infotype.aggregate('infotype', 'DISTINCT', { plain: false })
    .mapSeries(function (row) { 
		var category = row.DISTINCT;
		var data = {};
		data.category = category;
		var promises = [];
		var infolist = [];
		promises.push(Infotype.findAll({
				where:{
					infotype: category
				}
			}).then(function(result){
					for(var i=0; i < result.length;i++){
						var resData = result[i].dataValues;
						var info = {};
						info.name = resData.infoname;
						info.id = resData.infoid;
						info.price = resData.price;
						infolist.push(info);
					}
					data.info = infolist;
					datatypes.push(data);
				}
			))
			return Sequelize.Promise.all(promises).then(function(){
				promises = [];
			});
	})
    .then(function () {
		var data = {};
		data.datatypes = datatypes;
		res.json(data);
    })
}

// Gets a single Infotype from the DB
export function show(req, res) {
  return Infotype.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Infotype in the DB
export function create(req, res) {
  return Infotype.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Infotype in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Infotype.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Infotype in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Infotype.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Infotype from the DB
export function destroy(req, res) {
  return Infotype.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
