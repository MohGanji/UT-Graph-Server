var express = require('express');
var router = express.Router();
var root = require('./root');
var login = require('./login');
var register = require('./register');

router.use('/', root);
router.use('/login', login);
router.use('/register', register);

module.exports = router;
