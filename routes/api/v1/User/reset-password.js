var express = require('express');
var router = express.Router();
var isAuthenticated = require('../../../../middlewares/verifyJWTToken')
  .verifyJWTToken;
var resetPasswordController = require('../../../../controllers/User/resetPasswordCotroller');

router.post('/', isAuthenticated, resetPasswordController.resetPassword);

module.exports = router;
