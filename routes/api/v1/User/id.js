var express = require('express');
var router = express.Router({ mergeParams: true });
var idController = require('../../../../controllers/User/idController');

router.get('/', idController.getUserByUsername);

router.get('/events', idController.getUserEvents);

module.exports = router;
