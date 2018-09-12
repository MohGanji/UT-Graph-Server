var express = require('express');
var router = express.Router();
var UserValidations = require('../../../../validations/UserValidations');
var registerController = require('../../../../controllers/User/registerController');

router.post('/', UserValidations.register, registerController.registerUser);

module.exports = router;
