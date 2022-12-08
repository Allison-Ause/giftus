// @jest-environment node
// if I get "setImmediate is not defined"
// I need to activate that override variable above

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
  email: 'dog@dog.com',
  password: 'password',
};

describe('user routes', () => {
  beforeEach(() => {
    return setupDb();
  });

  it.skip('#POST /users route successfully sign ups a new user & signs them in', async () => {
    const res = await request(app).post('/users').send(newUser);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe(
      'Successfully logged in with new account!'
    );
  });

  it.skip('#POST /users/sessions signs in existing user', async () => {
    const res = await request(app)
      .post('/users/sessions')
      .send(existingUser);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Successfully signed in!');
  });

  it.skip('#DELETE /users/sessions signs out user', async () => {
    const agent = request.agent(app);
    await agent.post('/users/sessions').send(existingUser);

    const res = await agent.delete('/users/sessions');

    expect(res.status).toBe(204);
  });

  it.skip('GET /users/me', async () => {
    const agent = request.agent(app);
    await agent.post('/users').send(newUser);

    const res = await agent.get('/users/me');

    expect(res.status).toBe(200);
    expect(res.body.email).toEqual('nice@work.com');
  });
});
