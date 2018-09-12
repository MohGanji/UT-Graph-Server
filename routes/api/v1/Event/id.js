var express = require('express');
var router = express.Router({ mergeParams: true });
var isAuthenticated = require('../../../../middlewares/verifyJWTToken')
  .verifyJWTToken;
var id_controller = require('../../../../controllers/Event/idController');

router.get('/', id_controller.get_event);

router.put('/', isAuthenticated, id_controller.edit_event);

router.get('/participants', id_controller.get_event_participants);

router.post('/signup_staff', isAuthenticated, id_controller.signup_staff);

router.post(
  '/signup_attendent',
  isAuthenticated,
  id_controller.signup_attendent,
);

module.exports = router;
