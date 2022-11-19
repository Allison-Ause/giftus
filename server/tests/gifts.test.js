import request from 'supertest';
import { describe, expect, it } from '@jest/globals';
import setupDb from '../setup-data';
import app from '../app';

const testUser = {
  email: 'santa@christmas.com',
  password: 'password',
};

const existingUser = {
  email: 'dog@dog.com',
  password: 'password',
};

const newGift = {
  userId: '3',
  idea: 'rainbow glitter',
  link: 'url.link',
  price: 30,
  occasion: 'Christmas',
};

describe('gift routes', () => {
  beforeEach(() => {
    return setupDb();
  });

  it.skip('#POST /gifts route', async () => {
    const agent = request.agent(app);
    await agent.post('/users').send(testUser);

    const res = await agent.post('/gifts').send(newGift);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newGift,
      isPurchased: expect.any(Boolean),
      createdAt: expect.any(String),
    });
  });
});
