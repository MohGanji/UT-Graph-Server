var express = require('express');
var User = require('../../../../models/User');
var router = express.Router();
var isAuthenticated = require('../../../../middlewares/verifyJWTToken')
  .verifyJWTToken;
var UserEvent = require('../../../../models/UserEvent');
let Event = require('../../../../models/Event');

var normalizeImage = require('../../../../utils/normalizeImage');
var rootController = require('../../../../controllers/User/rootController');

router.get('/', rootController.get_users);

router.put('/', isAuthenticated, rootController.edit_profile);

router.patch(
  '/:activationStatus',
  isAuthenticated,
  rootController.activeOrDeactive,
);

router.get('/get_image/:id', rootController.get_image_by_username);

module.exports = router;
