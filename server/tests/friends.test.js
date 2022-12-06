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
  it('#GET /friends returns all friends', async () => {
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
});
