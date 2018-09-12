var express = require('express');
var router = express.Router({ mergeParams: true });
var isAuthenticated = require('../../../../middlewares/verifyJWTToken')
  .verifyJWTToken;
var uploadController = require('../../../../controllers/Event/uploadController');

router.post('/:id', isAuthenticated, uploadController.uploadImage);

module.exports = router;
