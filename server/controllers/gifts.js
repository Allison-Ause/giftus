import { Router } from 'express';
import authenticate from '../middleware/authenticate.js';
import Gifts from '../models/Gifts.js';

export default Router().post(
  '/',
  authenticate,
  async (req, res, next) => {
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
  }
);
