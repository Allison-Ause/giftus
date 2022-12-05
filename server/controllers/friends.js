import { Router } from 'express';
import authenticate from '../middleware/authenticate.js';
import Friends from '../models/Friends.js';

export default Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const data = await Friends.getAllFriends(req.user.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })