'use strict';

var express = require('express');
var controller = require('./request.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/personprevious/:id', controller.getpreviousrequests);
router.get('/personpending/:id', controller.getpendingrequests);
router.get('/person/:id', controller.getallpersonrequests);
router.get('/all/', controller.getallrequests);
router.get('/accessor/:accessor', controller.getcustomerrequests);
router.get('/:requestid', controller.show);
router.get('/:id/:amount', controller.latestuserrequest);
router.post('/', controller.create);
router.post('/useranswer', controller.answeruserrequest);
router.post('/companyanswer', controller.answercustomerrequest);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
