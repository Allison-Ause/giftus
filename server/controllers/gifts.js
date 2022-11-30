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
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', authenticate, async (req, res, next) => {
    try {
      const data = {
        ...req.body,
        id: req.params.id,
      };
      console.log('data sent from controller', data);
      const updatedGift = await Gifts.updateGift(data);
      console.log(
        'updatedGift returned from controller',
        updatedGift
      );
      res.json(updatedGift);
    } catch (e) {
      next(e);
    }
  });
