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
  .post('/', authenticate, async (req, res, next) => {
    try {
      const data = {
        ...req.body,
        userId: req.user.id,
      };
      const newFriend = await Friends.addFriend(data);
      res.json(newFriend);
    } catch (e) {
      next(e);
    }
  });