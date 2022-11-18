import { Router } from 'react-router-dom';
import Gifts from '../models/Gifts';

export default Router().post('/', async (req, res, next) => {
  try {
    const data = {
      ...req.body,
      userId: req.user.id,
    };
    console.log('data from gift cntrl', data);
    const newGift = await Gifts.addGift(data);
    console.log('newGift returned from model fn', newGift);
    res.json(newGift);
  } catch (e) {
    next(e);
  }
});
