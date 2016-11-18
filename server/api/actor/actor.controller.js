/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/actors              ->  index
 * POST    /api/actors              ->  create
 * GET     /api/actors/:id          ->  show
 * PUT     /api/actors/:id          ->  upsert
 * PATCH   /api/actors/:id          ->  patch
 * DELETE  /api/actors/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {Actor} from '../../sqldb';

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

// Gets a list of Actors
export function index(req, res) {
  return Actor.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Actor from the DB
export function show(req, res) {
  //var data = {name:"Media Markt", basicinfo:"A retail store.", description:"Media Markt is a German chain of stores selling consumer electronics with numerous branches throughout Europe and Asia. It is Europe's largest retailer of consumer electronics, and the second largest in the world after American retailer Best Buy.", branch:["Retail","Electronics"]};
  //res.json(data);
  var data={};
  
  return Actor.find({
    where: {
      id: req.params.id
    }
  }).then(function(actor){
	  console.log(actor);
	  var dataValues = actor.dataValues;
	  data.name = dataValues.name;
	  data.basicinfo = dataValues.basicinfo;
	  data.description = dataValues.description;
	  data.branch = JSON.parse(dataValues.branch)
	  res.json(data);
	 });
}

// Creates a new Actor in the DB
export function create(req, res) {
  return Actor.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Actor in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Actor.upsert(req.body, {
    where: {
      _id: req.params.id
    }
  })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Actor in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Actor.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Actor from the DB
export function destroy(req, res) {
  return Actor.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
