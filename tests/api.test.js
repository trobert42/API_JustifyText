const request = require('supertest');
const app = require('../src/server');

describe('Server.ts tests', () => {
  test('Math test', () => {
    expect(2 + 2).toBe(4);
  });
});

/////////////// TESTS FOR ENDPOINTS ///////////////
describe('Catch all routes', () => {
  const route = 'route';
  test('Should get error for all GET method', async () => {
    const response = await request(app).get(`/${route}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: `API not found at /${route} for GET`,
    });
  });
});

describe('Catch GET /api/justify', () => {
  const route = 'api/justify';
  test('Should get error for GET /api/justify', async () => {
    const response = await request(app).get(`/${route}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: `API not found at /${route} for GET`,
    });
  });
});

describe('Catch GET /api/token', () => {
  const route = 'api/token';
  test('Should get error for GET /api/token', async () => {
    const response = await request(app).get(`/${route}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      error: `API not found at /${route} for GET`,
    });
  });
});

/////////////// TESTS FOR POST /api/token ///////////////
describe('Catch POST /api/token - empty body', () => {
  const route = 'api/token';
  const requestBody = '';
  test('Should get error for POST /api/token with an empty body', async () => {
    const response = await request(app).post(`/${route}`).send(requestBody);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: `Bad request, missing body or email`,
    });
  });
});

describe('Catch POST /api/token - wrong contentType text/plain', () => {
  const route = 'api/token';
  const requestBody = '{"email":"toto@tata.com"}';
  test('Should get error for POST /api/token with a wrong contentType', async () => {
    const response = await request(app)
      .post(`/${route}`)
      .set('Content-Type', 'text/plain')
      .send(requestBody);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: `Bad request, missing email or bad email`,
    });
  });
});

/* doesnt work */
describe('Catch POST /api/token', () => {
  const route = 'api/token';
  const jsonObject = {
    email: 'toto@tata.com',
  };
  const jsonString = JSON.stringify(jsonObject);

  test('Should receive token', async () => {
    const response = await request(app)
      .post(`/${route}`)
      .set('Content-Type', 'application/json')
      .send(jsonString);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      token: `some token`,
    });
  });
});

/////////////// TESTS FOR POST /api/justify ///////////////
//TO DO
