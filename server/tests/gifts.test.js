// @jest-environment node
// if I get "setImmediate is not defined"
// I need to activate that override variable above

import request from 'supertest';
import { describe, expect, it } from '@jest/globals';
import setupDb from '../setup-data';
import app from '../app';

const existingUser = {
  email: 'dog@dog.com',
  password: 'password',
};

const newGift = {
  userId: '1',
  idea: 'rainbow glitter',
  friendId: '1',
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
    expect(res.body[0].idea).toBe('Ice Skates');
    expect(res.body[0].friend.name).toBe('Jenny');
  });

  it.skip('#POST /gifts adds new gift', async () => {
    const agent = request.agent(app);
    await agent.post('/users/sessions').send(existingUser);

    const res = await agent.post('/gifts').send(newGift);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newGift,
      isPurchased: expect.any(Boolean),
      createdAt: expect.any(String),
    });
  });

  it.skip('#GET /gifts/:id returns a single gift', async () => {
    const agent = request.agent(app);
    await agent.post('/users/sessions').send(existingUser);

    const res = await agent.get('/gifts/1');

    expect(res.status).toBe(200);
    expect(res.body.idea).toBe('Ice Skates');
    expect(res.body.friend.name).toBe('Jenny');
  });

  it('#DELETE /gifts/:id deletes specific gift', async () => {
    const agent = request.agent(app);
    await agent.post('/users/sessions').send(existingUser);

    const res = await agent.delete('/gifts/1');
    expect(res.status).toBe(200);

    const checkRes = await agent.get('/gifts');
    expect(checkRes.body.length).toBe(2);
  });

  it.skip('#PUT /gifts/:id updates specific gift', async () => {
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
