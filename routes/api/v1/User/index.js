var express = require('express');
var router = express.Router();
var root = require('./root');
var login = require('./login');
var register = require('./register');
var reset_password = require('./reset-password');
var forget_password = require('./forget-password');
var search = require('./search');
var upload = require('./upload');


router.use('/forget_password', forget_password);
router.use('/login', login);
router.use('/register', register);
router.use('/reset_password', reset_password);
router.use('/search', search);
router.use('/upload', upload);
router.use('/', root);

module.exports = router;