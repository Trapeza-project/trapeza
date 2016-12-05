'use strict';
import express from 'express';
import config from '../config/environment';
import {CustomerUser} from '../sqldb';

// Passport Configuration
require('./local/passport').setup(CustomerUser, config);

var router = express.Router();

router.use('/local', require('./local').default);

export default router;
