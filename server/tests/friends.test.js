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

    const newGift = {
      userId: '1',
      name: 'Jonathan Strange',
      birthday: '1825-01-11T07:52:58.000Z',
      address: '1313 Norrel St, Neverland',
    };

    const res = await agent.post('/friends').send(newGift);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...newGift,
    });
  });

  it('#GET /friends/:id gets one friend by id', async () => {
    const agent = request.agent(app);
    await agent.post('/users/sessions').send(existingUser);

    const res = await agent.get('/friends/1');
    expect(res.status).toBe(200);
    expect(res.body.id).toBe('1');
    expect(res.body.name).toBe('Jenny');
  });
});
