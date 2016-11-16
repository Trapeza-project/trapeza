/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/requests              ->  index
 * POST    /api/requests              ->  create
 * GET     /api/requests/:id          ->  show
 * PUT     /api/requests/:id          ->  upsert
 * PATCH   /api/requests/:id          ->  patch
 * DELETE  /api/requests/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import {RequestLog} from '../../sqldb';
import {PreviousRequest} from '../../sqldb';
import {PendingRequest} from '../../sqldb';
import {BasicData} from '../../sqldb';
import {ModuleSettings} from '../../sqldb';
import {InfoType} from '../../sqldb';
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

// Gets a list of Requests
export function index(req, res) {

}

// Gets the pending requests for a person
export function getpendingrequests(req, res) {
return 	PendingRequest.findAll({
    where: {
      personid: req.params.personid
    },
	order: '"timestamp" DESC'
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));

}


// Gets all the requests for a person
export function getallrequests(req, res) {
return 	RequestLog.findAll({
    where: {
      personid: req.params.person
    },
	order: '"timestamp" DESC'
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));


}

// Gets all the requests made by the customer
export function getcustomerrequests(req, res) {
return 	RequestLog.findAll({
    where: {
      accessid: req.params.accessor
    },
	order: '"timestamp" DESC'
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));


}
// Gets a single Request
export function show(req, res) {
	/*var basic = {name:"Kalle Karlsson", personid:"199007071415", UCHandle:false, timestamp:"01/01/2016", purpose:"Check to buy a phone.", access:"approved", companystatus:"pending"};
	var html = "<div class='weak-border-bottom'><h4 class='textborderbottom'>Personal</h4><p class='fontbold'>Address</p><p>Sveavägen 12</p><p class='fontbold inlineblock'>Latest change: </p><p class='inlineblock'>1/1/2015</p><h4 class='textborderbottom'>Economical</h4><p class='fontbold'>Income</p><p>50 000 SEK/month</p><p class='fontbold inlineblock'>Latest change: </p><p class='inlineblock'>1/1/2015</p></div>";
	var history = [{actor:{name:"Media Markt", id:"3"}, info:["Address"], timestamp:"1/1/2015", access:"approved"}, {actor:{name:"Elgiganten", id:"4"}, info:["Address", "Income"], timestamp:"1/1/2015", access:"denied"}, {actor:{name:"Media Markt", id:"3"}, info:["Address", "Income"], timestamp:"1/1/2015", access:"approved"}];
	var data = {basic:basic, html:html, history:history};
	res.json(data);*/
	RequestLog.find({
		where:{
			requestid: req.params.requestid
		}
	}).then(function(result){
		BasicData.find({
		where:{
			personid:result.personid 
		}
		})
		.then(function(dat){
			
			ModuleSettings.find({
				where:{
					moduleid:result.moduleid
				}
			}).then(function(module){
				var data = {};
				var basic = {};
				basic.name = dat.firstname + " " + dat.lastname;
				basic.personid=dat.personid;
				basic.UCHandle = module.UCHandle;
				data.basic = basic;
				res.json(data);
			})
		})
	})
}

export function latestuserrequest(req, res) {
	var chainer = new Sequelize.Utils.QueryChainer;
	var history = [];
	return RequestLog.findAll({
		   where: {
			 personid: req.params.id
			},
		  limit:req.params.amount,
		  order: '"timestamp" DESC'
		}).then(function(result){
			for(var i = 0; i<result.length; i++){
				var data = {};
				data.timestamp = result[i].timestamp;
				data.access = result[i].allow;
				data.info = [];
				var infoids = JSON.parse(result[i].infoids);
				for(var j = 0; j < infoids.length; j++){
					var f = InfoType.find({
						where:{
							infoid:infoids[j]
						}
					}).then(function(infotype){
						data.info.push(infotype.infoname);
					})
					chainer.add(f);
				}
				var func = Actor.find({
					where:{
						id:result[i].accessid
					}
				}).then(function(actor){
					var tempActor = {};
					tempActor.id=actor.id;
					tempActor.name=actor.name;
					data.actor = tempActor;
					history.push(data);
				})				
			}
		})
	chainer.runSerially()
	.success(function(){
			var data = {};
			data.history = history;
			res.json(data);
	})
	.error(function(err){
		console.log("Error");
	})
}

// Creates a new Request in the DB
export function create(req, res) {
	var newRequest = RequestLog.build();
	newRequest.setDataValue('moduleid', req.body.moduleid);
	newRequest.setDataValue('personid', req.body.id);
	newRequest.setDataValue('accessid', req.body.accessor);
	newRequest.setDataValue('purpose', req.body.purpose);
	newRequest.setDataValue('infoids', JSON.stringify(req.body.info));
	newRequest.setDataValue('pending', true);
	newRequest.setDataValue('allow', false);
	newRequest.setDataValue('companypending', true);
	newRequest.setDataValue('companyallow', false);
	newRequest.setDataValue('price', req.body.price);
	console.log(newRequest);
  return newRequest.save()
	.then(function(request) {
	  var pendingRequest = PendingRequest.build();
		pendingRequest.setDataValue('personid', req.body.id);
		pendingRequest.setDataValue('accessid', req.body.accessor);
		pendingRequest.setDataValue('infoids', JSON.stringify(req.body.info));
		pendingRequest.setDataValue('requestid', request.requestid);
		return pendingRequest.save()
		.then(function(pending){
			res.json({ requestid:pending.requestid });
		}).catch(console.log("BAD"));
	})
	.catch(console.log("BAD"));
}

// Answers a request
export function answerrequest(req, res) {
	var id = req.body.requestid;
	var approve = req.body.answer;
	RequestLog.find({
			where:{
				requestid:id
			}
		}).on('success', function (request) {
			// Check if record exists in db, and update
			if (request) {
				request.updateAttributes({
					pending: false,
					allow: approve
				}).success(function(){
					// Remove from pendingrequests
					
					PendingRequest.destroy({
						where:{
							requestid: id
						}
					}).then(function(request){
							// Add to previousrequest
							var prevRequest = PreviousRequest.build();
							prevRequest.setDataValue('requestid', id);
							prevRequest.setDataValue('infoids', request.infoids);
							prevRequest.setDataValue('timetolive', 10);
							prevRequest.setDataValue('allow', approve);
							prevRequest.setDataValue('companyapprove', false);
							prevRequest.setDataValue('companypending', false);
							prevRequest.setDataValue('data', "<div></div>");
							return prevRequest.save()
							.then(function(prev){
							res.json({ requestid:prev.requestid });
							}).catch(console.log("BAD"));
						})
				})
			}
		})
}



// Upserts the given Request in the DB at the specified ID
export function upsert(req, res) {

}

// Updates an existing Request in the DB
export function patch(req, res) {

}

// Deletes a Request from the DB
export function destroy(req, res) {

}
