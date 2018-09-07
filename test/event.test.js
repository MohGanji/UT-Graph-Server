const request = require('supertest');
const app = require('../app');
const mongoose = require('../utils/mongo');
const fs = require('fs');

describe('Test the event roots', () => {
  /*  beforeAll(done => {
    const content = {};
    fs.readFile('../testcases/sample_event/1.json', 'utf8', (err, data) => {
      content = JSON.parse(data);
    });
    agent = request.agent(app);
    agent
      .get('/api/v1/event')
      .send(content)
      .expect(200, done);
  }); */
  test(
    'It should response the GET method',
    () => {
      request(app)
        .get('/api/v1/event')
        .end(function (err, res) {
          // expect(res.data)
          expect(res.statusCode).toEqual(200);
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
