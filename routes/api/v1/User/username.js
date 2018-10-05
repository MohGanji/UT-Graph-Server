var express = require('express');
var router = express.Router({ mergeParams: true });
var usernameController = require('../../../../controllers/User/usernameController');

router.get('/events', usernameController.getUserEvents);

router.get('/', usernameController.getUserByUsername);

module.exports = router;
