'use strict';

var express = require('express');
var controller = require('./request.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:personid', controller.getpendingrequests);
router.get('/:person', controller.getallrequests);
router.get('/:accessor', controller.getcustomerrequests);
router.get('/:id', controller.show);
router.get('/:id/:amount', controller.latestuserrequest);
router.post('/', controller.create);
router.post('/answer', controller.answerrequest);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
