var express = require('express');
var router = express.Router();
var loginController = require('../../../../controllers/User/loginController');
var UserValidations = require('../../../../validations/UserValidations');

router.post('/', UserValidations.login, loginController.login);

module.exports = router;
