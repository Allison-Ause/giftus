// @jest-environment node
// if I get "setImmediate is not defined"
// I need to activate that override variable above

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
  userId: '1',
  idea: 'rainbow glitter',
  link: 'url.link',
  price: 30,
  occasion: 'Christmas',
};

describe('gift routes', () => {
  beforeEach(() => {
    return setupDb();
  });
  it.skip('#GET /gifts returns all gifts', async () => {
    const agent = request.agent(app);
    await agent.post('/users/sessions').send(existingUser);

    const res = await agent.get('/gifts');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(3);
    expect(res.body[0]).toEqual({
      id: '1',
      userId: '1',
      idea: 'Ice Skates',
      recipient: 'Jenny',
      link: 'url.link/buy',
      price: 45,
      occasion: 'Christmas',
      isPurchased: false,
      createdAt: expect.any(String),
    });
  });

  it.skip('#POST /gifts adds new gift', async () => {
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

  it.skip('#DELETE /gifts/:id deletes specific gift', async () => {
    const agent = request.agent(app);
    await agent.post('/users/sessions').send(existingUser);

    const res = await agent.delete('/gifts/1');

    expect(res.status).toBe(200);
    const checkRes = await agent.get('/gifts');
    expect(checkRes).to.not.include(id === 1);
  });

  it('#PUT /gifts/:id updates specific gift', async () => {
    const agent = request.agent(app);
    await agent.post('/users/sessions').send(existingUser);
    const updatedGift = {
      idea: 'Salt Lamp',
      price: 23,
    };

    const res = await agent.put('/gifts/2').send(updatedGift);

    expect(res.status).toBe(200);
    expect(res.body.idea).toBe('Salt Lamp');
    expect(res.body.price).toBe(23);
  });
});
