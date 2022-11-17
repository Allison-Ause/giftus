import request from 'supertest';
import { describe, expect, it } from '@jest/globals';
import setupDb from '../setup-data';
import app from '../app';

const newUser = {
  firstName: 'Hopeful',
  lastName: 'Optimist',
  email: 'nice@work.com',
  password: 'goodtimes',
};

const existingUser = {
  email: 'new@test.com',
  password: 'password',
};

describe('user routes', () => {
  beforeEach(() => {
    return setupDb();
  });

  it('#POST /users route successfully sign ups a new user & signs them in', async () => {
    const res = await request(app).post('/users').send(newUser);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe(
      'Successfully logged in with new account!'
    );
  });

  it('#POST /users/sessions', async () => {
    const res = await request(app)
      .post('/users/sessions')
      .send(existingUser);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Successfully signed in!');
  });
});
