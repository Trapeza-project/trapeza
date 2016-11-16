/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/datas              ->  index
 * POST    /api/datas              ->  create
 * GET     /api/datas/:id          ->  show
 * PUT     /api/datas/:id          ->  upsert
 * PATCH   /api/datas/:id          ->  patch
 * DELETE  /api/datas/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Datalog} from '../../sqldb';
import {FinancialData} from '../../sqldb';
import {EducationalData} from '../../sqldb';
import {BasicData} from '../../sqldb';
import {Tablemapper} from '../../sqldb';
import {RequestLog} from '../../sqldb';
import {PreviousRequest} from '../../sqldb';

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

// Gets a list of the datalog
export function index(req, res) {
  return Datalog.findAll({order: '"timestamp" DESC'})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Get the amount latest
export function getuserlog(req, res) {
	return Datalog.findAll({
	   where: {
		personid: req.params.id
		},
	  order: '"timestamp" DESC'
	}).then(handleEntityNotFound(res))
		.then(respondWithResult(res))
		.catch(handleError(res));
}

// Get the amount latest
export function getlatest(req, res) {
	return Datalog.findAll({
	  limit:req.params.amount,
	  order: '"timestamp" DESC'
	}).then(handleEntityNotFound(res))
		.then(respondWithResult(res))
		.catch(handleError(res));
}

// Get the amount latest
export function getuserlatest(req, res) {
	return Datalog.findAll({
	   where: {
		personid: req.params.id
		},
	  limit:req.params.amount,
	  order: '"timestamp" DESC'
	}).then(handleEntityNotFound(res))
		.then(respondWithResult(res))
		.catch(handleError(res));
}

// Creates or updates existing data
export function createdata(req, res) {
  var table;

  Tablemapper.find({
    where: {
      infoid: req.body.infoid
	}	
	  }).then(function(res){
		if(res.table == "Financials"){
			table = FinancialData;
		}else if(res.table == "Basics"){
			table = BasicData;
		}else if(res.table == "Educationals"){
			table = EducationalData;
		}else{
			// Not found
			return;
		}
		var column = res.column;
		table.find({
			where:{
				personid:req.body.personid
			}
		}).then(function (person) {
			// Check if record exists in db, and update
			if (person) {
				person.updateAttributes({
					column: req.body.data
				}).then(function(){
						var entry = Datalog.build();
						entry.setDataValue('personid', req.body.personid);
						entry.setDataValue('infoid', req.body.infoid);
						entry.setDataValue('provider', req.body.provider);
						entry.setDataValue('selfupload', true);
						entry.setDataValue('validation', req.body.validation);
					  return entry.save()
						.then(function() {
						  res.json();
						})
						.catch(console.log("BAD"));
				})
			}
		});
			respondWithResult(res, 404);
		});
}

export function getdata(req, res) {
  var id = req.params.requestid;
  
  // Check if it is okay
  var permitted = true;
  
  PreviousRequest.find({
	  where:{
		  requestid:id
	  }
	}).then(function(res){
		if(permitted){
			respondWithResult(res);
		}else{
			res.json({allow:permitted});
		}
	})
    .catch(handleError(res));
}

// Upserts the given Data in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Data.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Data in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Data.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Data from the DB
export function destroy(req, res) {
  return Data.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
