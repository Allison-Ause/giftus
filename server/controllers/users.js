import { Router } from 'express';
import UserService from '../services/UserService.js';

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

export default Router().post('/', async (req, res, next) => {
  try {
    console.log('controller req.body', req.body);
    const token = await UserService.signUp(req.body);
    console.log('controller: token', token);
    res
      .cookie(process.env.COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.SECURE_COOKIES === 'true',
        sameSite:
          process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
        maxAge: ONE_DAY_IN_MS,
      })
      .json({ message: 'Successfully logged in with new account!' });
  } catch (e) {
    next(e);
  }
});
