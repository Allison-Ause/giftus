import { Router } from 'express';
import UserService from '../services/UserService.js';

export default Router().post('/', async (req, res, next) => {
  try {
    console.log('controller req.body', req.body);
    const token = await UserService.signUp(req.body);
    console.log('controller: token', token);
    res.json(token);
  } catch (e) {
    next(e);
  }
});
