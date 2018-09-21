var express = require('express');
var resetPasswordController = require('../../../../controllers/User/resetPasswordController');
var router = express.Router();

router.get('/:hash', resetPasswordController.renderResetPaswordPage);
router.post('/', resetPasswordController.handleResetPassword);
router.put('/', resetPasswordController.submitNewResetRequest);

module.exports = router;
