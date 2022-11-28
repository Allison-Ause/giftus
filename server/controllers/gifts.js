import { Router } from 'express';
import authenticate from '../middleware/authenticate.js';
import Gifts from '../models/Gifts.js';

export default Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const data = await Gifts.getAllGifts(req.user.id);
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
      const newGift = await Gifts.addGift(data);
      res.json(newGift);
    } catch (e) {
      next(e);
    }
  })
  .delete('/:id', authenticate, async (req, res, next) => {
    try {
      const data = await Gifts.deleteGift(req.params.id);
      console.log('deleted gift from controller', data);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
