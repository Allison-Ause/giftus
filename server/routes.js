import express from 'express';

import usersController from './controllers/users.js';
import giftsController from './controllers/gifts.js';
import friendsController from './controllers/friends.js';

export default () => {
  const prefixRouter = express.Router();

  prefixRouter.use('/users', usersController);
  prefixRouter.use('/gifts', giftsController);
  prefixRouter.use('/friends', friendsController);

  return prefixRouter;
};
