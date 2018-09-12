var express = require('express');
var User = require('../../../../models/User');
var router = express.Router();
var isAuthenticated = require('../../../../middlewares/verifyJWTToken')
  .verifyJWTToken;
var root_controller = require('../../../../controllers/Event/rootController');
var event_validations = require('../../../../validations/EventValidations');

router.get('/get/:type', root_controller.get_events_by_type);

router.post(
  '/',
  isAuthenticated,
  event_validations.create_event,
  root_controller.create_event,
);

module.exports = router;
