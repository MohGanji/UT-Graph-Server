var express = require('express');
var router = express.Router();
var isAuthenticated = require('../../../../middlewares/isAuthenticated');
var rootController = require('../../../../controllers/Event/rootController');
var eventValidations = require('../../../../validations/EventValidations');

router.get('/get/:type', rootController.getEventsByType);

router.post(
  '/',
  isAuthenticated,
  eventValidations.createEvent,
  rootController.createEvent
);

module.exports = router;
