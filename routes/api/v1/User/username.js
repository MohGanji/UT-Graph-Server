var express = require('express');
var router = express.Router({ mergeParams: true });
var usernameController = require('../../../../controllers/User/usernameController');

router.get('/', usernameController.getUserByUsername);

router.get('/events/:role', usernameController.getUserEvents);

module.exports = router;
