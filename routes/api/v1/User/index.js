var express = require('express');
var router = express.Router();
var root = require('./root');
var login = require('./login');
var register = require('./register');
var reset_password = require('./reset-password');
var search = require('./search');

router.use('/', root);
router.use('/login', login);
router.use('/register', register);
router.use('/reset-password', reset_password);
router.use('/search', search);

module.exports = router;
