var express = require('express');
var forgetPasswordController = require('../../../../controllers/User/forgetPasswordController');
var router = express.Router();

router.get('/', forgetPasswordController.renderForgetPaswordPage);

router.post('/sent_email', forgetPasswordController.handleForgetPassword);

module.exports = router;
