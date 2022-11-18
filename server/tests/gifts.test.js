import request from 'supertest';
import { describe, expect, it } from '@jest/globals';
import setupDb from '../setup-data';
import app from '../app';

const testUser = {
  email: 'santa@christmas.com',
  password: 'password',
};

const newGift = {
  idea: 'rainbow glitter',
};

describe('gift routes', () => {
  beforeEach(() => {
    return setupDb();
  });

  it.only('#POST /gifts route', async () => {
    const agent = request.agent(app);
    await agent.post('/gifts').send(testUser);

    const res = await agent.post('/gifts').send(newGift);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newGift,
      is_purchased: expect.toBe('false'),
      created_at: expect.any(String),
    });
  });
});
