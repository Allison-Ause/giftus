import request from 'supertest';
// This JavaScript file imports a TypeScript file from the test suite.
import app from '../app';
import { describe, expect, it } from '@jest/globals';
import setupDb from '../setup-data.js';

const testUser = {
  firstName: 'Hopeful',
  lastName: 'Optimist',
  email: 'nice@work.com',
  password: 'goodtimes',
};

describe('user routes', () => {
  beforeEach(() => {
    setupDb();
  });

  it.only('/users route successfully sign ups a new user & signs them in', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send(testUser);

    expect(res.status).toBe(200);
  });
});
