var express = require('express');
var router = express.Router();
var authController = require('../../../../controllers/auth/authController');

router.post('/refreshToken', authController.refreshToken);
router.post('/validateToken', authController.validateAccessToken);

module.exports = router;
