var express = require('express');
var router = express.Router({ mergeParams: true });
var isAuthenticated = require('../../../../middlewares/isAuthenticated');
var idController = require('../../../../controllers/Event/idController');

router.get('/', idController.getEvent);

router.put('/', isAuthenticated, idController.editEvent);

router.get('/participant-number', idController.getEventParticipantNumber);

router.get('/staff', idController.getEventStaff);

router.delete('/', isAuthenticated, idController.deleteEvent);

router.get('/participants', idController.getEventParticipants);

router.post('/signup_staff', isAuthenticated, idController.signupStaff);

router.post('/signup_attendent', isAuthenticated, idController.signupAttendent);

module.exports = router;
