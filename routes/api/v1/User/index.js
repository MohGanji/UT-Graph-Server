var express = require('express');
var router = express.Router();
var root = require('./root');
var login = require('./login');
var register = require('./register');
var resetPassword = require('./reset-password');
var forgetPassword = require('./forget-password');
var search = require('./search');
var upload = require('./upload');
var idParam = require('./id');
var logout = require('./logout');
var emailValidation = require('./email-validation');

router.use('/forget_password', forgetPassword);
router.use('/login', login);
router.use('/logout', logout);
router.use('/register', register);
router.use('/reset_password', resetPassword);
router.use('/search', search);
router.use('/upload', upload);
router.use('/email-validation/:hash', emailValidation);
router.use('/:id', idParam);
router.use('/', root);

module.exports = router;
