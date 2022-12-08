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
  })
  .get('/:id', authenticate, async (req, res, next) => {
    try {
      const data = await Friends.getFriendById(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', authenticate, async (req, res, next) => {
    try {
      const data = { id: req.params.id, ...req.body };
      const updatedFriend = await Friends.updateFriend(data);
      res.json(updatedFriend);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', authenticate, async (req, res, next) => {
    try {
      const data = await Friends.deleteFriend(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
