var express = require('express');
var router = express.Router({ mergeParams: true });
var isAuthenticated = require('../../../../middlewares/verifyJWTToken')
  .verifyJWTToken;
var upload_controller = require('../../../../controllers/Event/uploadController');

router.post('/:id', isAuthenticated, upload_controller.upload_image);

module.exports = router;
