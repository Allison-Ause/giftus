import { Router } from 'express';
import authenticate from '../middleware/authenticate.js';
import UserService from '../services/UserService.js';

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

export default Router()
  .post('/', async (req, res, next) => {
    try {
      await UserService.signUp(req.body);
      const token = await UserService.signIn(req.body);
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
      const sessionToken = await UserService.signIn(req.body);
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
  })
  .get('/me', authenticate, async (req, res, next) => {
    try {
      res.json(req.user);
    } catch (e) {
      next(e);
    }
  })
  .delete('/sessions', (req, res, next) => {
    try {
      res
        .clearCookie(process.env.COOKIE_NAME, {
          httpOnly: true,
          secure: process.env.SECURE_COOKIES === 'true',
          sameSite:
            process.env.SECURE_COOKIES === 'true' ? 'none' : 'strict',
          maxAge: ONE_DAY_IN_MS,
        })
        .status(204)
        .send();
    } catch (e) {
      next(e);
    }
  });
