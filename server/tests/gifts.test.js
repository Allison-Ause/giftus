import request from 'supertest';
import { describe, expect, it } from '@jest/globals';
import setupDb from '../setup-data';
import app from '../app';

const testUser = {
  email: 'santa@christmas.com',
  password: 'password',
};

const newGift = {
  user_id: '1',
  idea: 'rainbow glitter',
  link: 'url.link',
  price: 30,
  occasion: 'Christmas',
};

describe('gift routes', () => {
  beforeEach(() => {
    return setupDb();
  });

  it.only('#POST /gifts route', async () => {
    const agent = request.agent(app);
    await agent.post('/users').send(testUser); // users route is successful

    const res = await agent.post('/gifts').send(newGift);
    console.log('res in test', res);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newGift,
      is_purchased: expect.toBe('false'),
      created_at: expect.any(String),
    });
  });
});
