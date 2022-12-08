import request from 'supertest';
import { describe, expect, it } from '@jest/globals';
import setupDb from '../setup-data';
import app from '../app';

const existingUser = {
  email: 'dog@dog.com',
  password: 'password',
};

describe('friends routes', () => {
  beforeEach(() => {
    return setupDb();
  });
  it.skip('#GET /friends returns all friends', async () => {
    const agent = request.agent(app);
    await agent.post('/users/sessions').send(existingUser);

    const res = await agent.get('/friends');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(3);
    expect(res.body[0]).toEqual({
      id: '1',
      userId: '1',
      name: 'Jenny',
      birthday: '1976-05-22T07:00:00.000Z',
      address: '29480 SW Volley St #22, Wilsonville OR 97070',
    });
  });

  it.skip('#POST /friends adds new friend', async () => {
    const agent = request.agent(app);
    await agent.post('/users/sessions').send(existingUser);

    const newFriend = {
      userId: '1',
      name: 'Jonathan Strange',
      birthday: '1825-01-11T07:52:58.000Z',
      address: '1313 Norrel St, Neverland',
    };

    const res = await agent.post('/friends').send(newFriend);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newFriend,
    });
  });

  it.skip('#DELETE /friends/:id deletes a single friend and all associated gifts', async () => {
    const agent = request.agent(app);
    await agent.post('/users/sessions').send(existingUser);

    const res = await agent.delete('/friends/1');
    expect(res.status).toBe(200);

    const checkRes = await agent.get('/friends');
    console.log('friends returned', checkRes.body);
    expect(checkRes.body.length).toBe(2);
    // friendID 1 prev. owned giftId 1 (which no longer exists after cascade)
    const gifts = await agent.get('/gifts');

    expect(gifts.body.length).toBe(2);
  });

  it.skip('#GET /friends/:id gets one friend by id', async () => {
    const agent = request.agent(app);
    await agent.post('/users/sessions').send(existingUser);

    const res = await agent.get('/friends/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe('1');
    expect(res.body.name).toBe('Jenny');
  });

  it.skip('#PUT /friends/:id updates one friend by id', async () => {
    const agent = request.agent(app);
    await agent.post('/users/sessions').send(existingUser);

    const res = await agent
      .put('/friends/1')
      .send({ name: 'Jennifer Ause' });
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Jennifer Ause');
  });
});
