const request = require('supertest');
//const app = require('./Event/root');
const app = require('../../../app');
const mongoose = require('../../../utils/mongo');

describe('Test the root path', () => {
  test(
    'It should response the GET method',
    () => {
      return request(app)
        .get('/api/v1/event')
        .end(function(err, res) {
          console.log(res.body);
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    },
    30000,
  );

  afterAll(async () => {
    await mongoose.disconnect();
    app.destroy();
  });
});
