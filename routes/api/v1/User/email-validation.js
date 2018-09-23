var express = require('express');
var router = express.Router({ mergeParams: true });
var controller = require('../../../../controllers/User/emailValidationController');

router.get('/', controller.validateEmail);

module.exports = router;
