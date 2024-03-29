var express = require('express');
var uploadController = require('../../../../controllers/User/uploadController');
var router = express.Router();
var isAuthenticated = require('../../../../middlewares/isAuthenticated');

router.post('/', isAuthenticated, uploadController.uploadImage);

module.exports = router;
