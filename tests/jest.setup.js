const { Pool } = require('pg');

jest.mock('pg', () => {
  const actualPg = jest.requireActual('pg');
  const mockPool = new actualPg.Pool();

  mockPool.connect = jest.fn().mockImplementation(() => Promise.resolve());

  return {
    ...actualPg,
    Pool: jest.fn(() => mockPool),
  };
});
