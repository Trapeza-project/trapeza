'use strict';

var express = require('express');
var controller = require('./data.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.getuserlog);
router.get('/request/:requestid', controller.getdata);
router.get('/:amount', controller.getlatest);
router.get('/:amount/:id', controller.getuserlatest);
router.post('/', controller.createdata);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', controller.destroy);

module.exports = router;
