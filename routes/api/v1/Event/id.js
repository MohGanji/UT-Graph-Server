var express = require('express');
var router = express.Router({ mergeParams: true });
var isAuthenticated = require('../../../../middlewares/verifyJWTToken')
  .verifyJWTToken;
var idController = require('../../../../controllers/Event/idController');

router.get('/', idController.getEvent);

router.put('/', isAuthenticated, idController.editEvent);

router.get('/participant-number', idController.getEventParticipantNumber);

router.get('/staff', idController.getEventStaff);

router.post('/signup_staff', isAuthenticated, idController.signupStaff);

router.post('/signup_attendent', isAuthenticated, idController.signupAttendent);

module.exports = router;
