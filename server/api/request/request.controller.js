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
import {ModuleSetting} from '../../sqldb';
import {Infotype} from '../../sqldb';
import {Actor} from '../../sqldb';
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

// Gets a list of Requests
export function index(req, res) {

}

// Gets the previous requests for a person
export function getpreviousrequests(req, res) {
	var history = [];
	return RequestLog.findAll({
		where: {
			personid: req.params.id,
			pending: false
		},
		order: '"timestamp" DESC'
	}).mapSeries(function(request){
			var dataValues = request.dataValues;
			var data = dataValues;
			var date = new Date(dataValues.timestamp);
			var year = date.getFullYear();
			var month = (date.getMonth()+1);
			if(month < 10){
				month = "0"+month;
			}
			var day = date.getDate();
			if(day < 10){
				day = "0"+day;
			}
			data.timestamp = year + '/' + month + '/' + day;
			var tempids = [];
			var promises = [];
			var infoids = JSON.parse(dataValues.infoids);

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
					tempids.push(infoValues.infoname);
				}))
			})
			promises.push(Actor.find({
					where:{
						id:dataValues.accessid
					}
				}).then(function(actor){
					var tempActor = {};
					tempActor.id=actor.dataValues.id;
					tempActor.name=actor.dataValues.name;
					data.actor = tempActor;
				}));

			promises.push(PreviousRequest.find({
					where:{
						requestid:dataValues.requestid
					}
				}).then(function(prevReq){
					data.data = prevReq.dataValues.data;
				}));

			return Sequelize.Promise.all(promises).then(function(){
					data.info = tempids;
					history.push(data);
			})
	}).then(function(){
			var data = {};
			data.history = history;
			res.json(data);
	})

}

// Gets the pending requests for a person
export function getpendingrequests(req, res) {
	var history = [];
	return PendingRequest.findAll({
		   where: {
			 personid: req.params.id
			},
		  order: '"timestamp" DESC'
		}).mapSeries(function(request){
			var dataValues = request.dataValues;
			var data = dataValues;
			var date = new Date(dataValues.timestamp);
			var year = date.getFullYear();
			var month = (date.getMonth()+1);
			if(month < 10){
				month = "0"+month;
			}
			var day = date.getDate();
			if(day < 10){
				day = "0"+day;
			}
			data.timestamp = year + '/' + month + '/' + day;

			var tempids = [];
			var promises = [];
			var infoids = JSON.parse(dataValues.infoids);

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
					tempids.push(infoValues.infoname);
				}))
			})
			promises.push(Actor.find({
					where:{
						id:dataValues.accessid
					}
				}).then(function(actor){
					var tempActor = {};
					tempActor.id=actor.dataValues.id;
					tempActor.name=actor.dataValues.name;
					data.actor = tempActor;
				}));

			return Sequelize.Promise.all(promises).then(function(){
					data.info = tempids;
					history.push(data);
			})

		}).then(function(){
			var data = {};
			data.history = history;
			res.json(data);
	})

}

// Gets all the requests
export function getallrequests(req, res) {
	var history = [];
	return RequestLog.findAll({
		  order: '"timestamp" DESC'
		}).mapSeries(function(request){
			console.log(request);
			var dataValues = request.dataValues;
			var data = dataValues;
			var date = new Date(dataValues.timestamp);

			var year = date.getFullYear();
			var month = (date.getMonth()+1);
			if(month < 10){
				month = "0"+month;
			}
			var day = date.getDate();
			if(day < 10){
				day = "0"+day;
			}
			data.timestamp = year + '/' + month + '/' + day;

			var tempids = [];
			var promises = [];
			var infoids = JSON.parse(dataValues.infoids);

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
					tempids.push(infoValues.infoname);
				}))
			})
			promises.push(Actor.find({
					where:{
						id:dataValues.accessid
					}
				}).then(function(actor){
					var tempActor = {};
					tempActor.id=actor.dataValues.id;
					tempActor.name=actor.dataValues.name;
					data.actor = tempActor;
				}));

			return Sequelize.Promise.all(promises).then(function(){
					data.info = tempids;
					history.push(data);
			})
		}).then(function(){
			var data = {};
			data.history = history;
			res.json(data);
	})
}


// Gets all the requests for a person
export function getallpersonrequests(req, res) {
	var history = [];
	return RequestLog.findAll({
		   where: {
			 personid: req.params.id
			},
		  order: '"timestamp" DESC'
		}).mapSeries(function(request){
			var dataValues = request.dataValues;
			var data = dataValues;
			var date = new Date(dataValues.timestamp);
			var year = date.getFullYear();
			var month = (date.getMonth()+1);
			if(month < 10){
				month = "0"+month;
			}
			var day = date.getDate();
			if(day < 10){
				day = "0"+day;
			}
			data.timestamp = year + '/' + month + '/' + day;

			var tempids = [];
			var promises = [];
			var infoids = JSON.parse(dataValues.infoids);

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
					tempids.push(infoValues.infoname);
				}))
			})
			promises.push(Actor.find({
					where:{
						id:dataValues.accessid
					}
				}).then(function(actor){
					var tempActor = {};
					tempActor.id=actor.dataValues.id;
					tempActor.name=actor.dataValues.name;
					data.actor = tempActor;
				}));

			return Sequelize.Promise.all(promises).then(function(){
					data.info = tempids;
					history.push(data);
			})
		}).then(function(){
			var data = {};
			data.history = history;
			res.json(data);
	})
}

// Gets all the requests made by the customer
export function getcustomerrequests(req, res) {
	var customerReq = [];
return 	RequestLog.findAll({
    where: {
      accessid: req.params.accessor
    },
	order: '"timestamp" DESC'
  }).mapSeries(function(request){
		var tempRequest = request.dataValues;
		var date = new Date(tempRequest.timestamp);


		var year = date.getFullYear();
		var month = (date.getMonth()+1);
		if(month < 10){
			month = "0"+month;
		}
		var day = date.getDate();
		if(day < 10){
			day = "0"+day;
		}
		var hour = date.getHours();
		if(hour < 10){
			hour = "0"+hour;
		}
		var minute = date.getMinutes();
		if(minute < 10){
			minute = "0"+minute;
		}
		var second = date.getSeconds();
		if(second < 10){
			second = "0"+second
		}

		tempRequest.timestamp = year + '/' + month + '/' + day + ' '+hour+':'+minute+':'+second;


	  var infoids = JSON.parse(tempRequest.infoids);
	  var tempids = [];
	  var promises = [];
	  promises.push(BasicData.find({
		  where: {
			  personid: tempRequest.personid
		  }
	  }).then(function(basData){
		  if(basData != null){
			  var bas = basData.dataValues;
			  tempRequest.name = bas.firstname + " " + bas.lastname;
		  }else{
			  tempRequest.name = "Kalle Kallesson";
		  }
	  })
	  )

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
				tempids.push(infoValues.infoname);
			}))
		})

		return Sequelize.Promise.all(promises).then(function(){
				tempRequest.info = tempids;
				customerReq.push(tempRequest);
		})
  }).then(function(){
		   res.json(customerReq);
		})


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
		if(result==null){
			return;
		}
		var dataValues = result.dataValues;
		BasicData.find({
		where:{
			personid:dataValues.personid
		}
		})
		.then(function(dat){
			if(dat==null){
				return;
			}
			ModuleSetting.find({
				where:{
					moduleid:dataValues.moduleid
				}
			}).then(function(module){
				var data = {};
				var basic = {};
				if(module==null){
					basic.UCHandle = false;
				}else{
					basic.UCHandle = module.dataValues.UCHandle;
				}
				basic.name = dat.dataValues.firstname + " " + dat.dataValues.lastname;
				basic.personid=dat.dataValues.personid;
				var date = new Date(dataValues.timestamp);


				var year = date.getFullYear();
				var month = (date.getMonth()+1);
				if(month < 10){
					month = "0"+month;
				}
				var day = date.getDate();
				if(day < 10){
					day = "0"+day;
				}
				var hour = date.getHours();
				if(hour < 10){
					hour = "0"+hour;
				}
				var minute = date.getMinutes();
				if(minute < 10){
					minute = "0"+minute;
				}
				var second = date.getSeconds();
				if(second < 10){
					second = "0"+second
				}

				basic.timestamp = year + '/' + month + '/' + day + ' '+hour+':'+minute+':'+second;

				basic.purpose = dataValues.purpose;
				basic.allow = dataValues.allow;
				basic.companyallow = dataValues.companyallow;
				basic.companypending = dataValues.companypending;
				basic.pending = dataValues.pending;
				data.basic = basic;
				res.json(data);
			})
		})
	})
}

export function latestuserrequest(req, res) {
	//var history = [{actor:{name:"Media Markt", id:"3"}, info:["Address"], timestamp:"1/1/2015", access:"approved"}, {actor:{name:"Elgiganten", id:"4"}, info:["Address", "Income"], timestamp:"1/1/2015", access:"denied"}, {actor:{name:"Media Markt", id:"3"}, info:["Address", "Income"], timestamp:"1/1/2015", access:"approved"}];
	var history = [];
	return RequestLog.findAll({
		   where: {
			 personid: req.params.id
			},
		  limit:req.params.amount,
		  order: '"timestamp" DESC'
		}).mapSeries(function(request){
			var dataValues = request.dataValues;
			var data = {};
			var date = new Date(dataValues.timestamp);

			var year = date.getFullYear();
			var month = (date.getMonth()+1);
			if(month < 10){
				month = "0"+month;
			}
			var day = date.getDate();
			if(day < 10){
				day = "0"+day;
			}
			data.timestamp = year + '/' + month + '/' + day;
			data.access = dataValues.allow;

			var tempids = [];
			var promises = [];
			var infoids = JSON.parse(dataValues.infoids);

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
					tempids.push(infoValues.infoname);
				}))
			})
			promises.push(Actor.find({
					where:{
						id:dataValues.accessid
					}
				}).then(function(actor){
					if(actor != actor.dataValues){
						var tempActor = {};
						tempActor.id=actor.dataValues.id;
						tempActor.name=actor.dataValues.name;
						data.actor = tempActor;
					}
				}));

			return Sequelize.Promise.all(promises).then(function(){
					data.info = tempids;
					history.push(data);
			})

		}).then(function(){
			var data = {};
			data.history = history;
			res.json(data);
	})
}

// Creates a new Request in the DB
export function create(req, res) {
	var newRequest = RequestLog.build();
	return ModuleSetting.find({
		where:{
			moduleid: req.body.moduleid,
			UCHandle: true
		}
	}).then(function(mod){
		if(mod==null){
			newRequest.setDataValue('companypending', true);
			newRequest.setDataValue('companyallow', false);
		}else{
			newRequest.setDataValue('companypending', false);
			newRequest.setDataValue('companyallow', true);
		}
		newRequest.setDataValue('moduleid', req.body.moduleid);
		newRequest.setDataValue('personid', req.body.id);
		newRequest.setDataValue('accessid', req.body.accessor);
		newRequest.setDataValue('purpose', req.body.purpose);
		newRequest.setDataValue('infoids', JSON.stringify(req.body.info));
		newRequest.setDataValue('pending', true);
		newRequest.setDataValue('allow', false);
		newRequest.setDataValue('price', req.body.price);
		return newRequest.save();
	}).then(function(request) {
	  var pendingRequest = PendingRequest.build();
		pendingRequest.setDataValue('personid', req.body.id);
		pendingRequest.setDataValue('accessid', req.body.accessor);
		pendingRequest.setDataValue('infoids', JSON.stringify(req.body.info));
		pendingRequest.setDataValue('requestid', request.requestid);
		return pendingRequest.save()
		.then(function(pending){
			res.json({ requestid:pending.requestid });
		});
	});
}

// Answer a customer request
export function answercustomerrequest(req, res) {
	var id = req.body.requestid;
	var allow = req.body.companyallow;
return RequestLog.find({
			where:{
				requestid:id
			}
		}).then(function (request) {
			// Check if record exists in db, and update
			if (request) {
				request.updateAttributes({
					companypending: false,
					companyallow: allow
				}).then(function(){
					return res.json({approve:true});
			})
			}else{
				res.json({approve:false});
			}
		})
}

// Answers a user request
export function answeruserrequest(req, res) {
	var id = req.body.requestid;
	var approve = req.body.answer;
	return RequestLog.find({
			where:{
				requestid:id
			}
		}).then(function (request) {
			// Check if record exists in db, and update
			var infoids = "";
			var companyapprove = false;
			var companypending = false;
			if (request) {
				infoids = request.dataValues.infoids;
				companyapprove = request.dataValues.companyallow;
				companypending = request.dataValues.companypending;
				request.updateAttributes({
					pending: false,
					allow: approve
				}).then(function(){
					// Remove from pendingrequests

					PendingRequest.destroy({
						where:{
							requestid: id
						}
					}).then(function(){
							// Add to previousrequest
							var prevRequest = PreviousRequest.build();
							prevRequest.setDataValue('requestid', id);
							prevRequest.setDataValue('infoids', infoids);
							prevRequest.setDataValue('timetolive', 10);
							prevRequest.setDataValue('allow', approve);
							prevRequest.setDataValue('companyapprove', companyapprove);
							prevRequest.setDataValue('companypending', companypending);
							prevRequest.setDataValue('data', "<div class='weak-border-bottom'><h4 class='textborderbottom'>Personal</h4><p class='fontbold'>Address</p><p>Sveavägen 12</p><p class='fontbold inlineblock'>Latest change: </p><p class='inlineblock'>1/1/2015</p><h4 class='textborderbottom'>Economical</h4><p class='fontbold'>Income</p><p>50 000 SEK/month</p><p class='fontbold inlineblock'>Latest change: </p><p class='inlineblock'>1/1/2015</p></div>");
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
