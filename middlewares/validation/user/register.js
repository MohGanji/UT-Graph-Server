var Joi = require('joi');

module.exports = {
  options: {
    status: 422,
    statusText: 'Unprocessable Entity'
  },
  body: {
    data: {
      email: Joi.string().email().required()
    }
  }
};