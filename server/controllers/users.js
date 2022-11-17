import { Router } from 'express';
import UserService from '../services/UserService.js';

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const token = await UserService.signUp(req.body);

      res
        .cookie(process.env.COOKIE_NAME, token, {
          httpOnly: true,
          secure: process.env.SECURE_COOKIES === 'true',
          sameSite:
            process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
          maxAge: ONE_DAY_IN_MS,
        })
        .json({
          message: 'Successfully logged in with new account!',
        });
    } catch (e) {
      next(e);
    }
  })
  .post('/sessions', async (req, res, next) => {
    try {
      console.log('controller req.body', req.body);
      const sessionToken = await UserService.signIn(req.body);
      console.log('sessionToken from controller:', sessionToken);
      res
        .cookie(process.env.COOKIE_NAME, sessionToken, {
          httpOnly: true,
          secure: process.env.SECURE_COOKIES === 'true',
          sameSite:
            process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
          maxAge: ONE_DAY_IN_MS,
        })
        .json({ message: 'Successfully signed in!' });
    } catch (e) {
      next(e);
    }
  });
