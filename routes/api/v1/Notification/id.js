var express = require('express');
var router = express.Router({ mergeParams: true });
var isAuthenticated = require('../../../../middlewares/verifyJWTToken')
  .verifyJWTToken;

var idController = require('../../../../controllers/Notification/idController');

router.get('/', isAuthenticated, idController.getNotificationById);

router.post('/accept', isAuthenticated, idController.acceptById);

router.post('/reject', isAuthenticated, idController.rejectById);

module.exports = router;
