import { Router } from 'express';

export default Router().get('/', (req, res, next) => {
  try {
  } catch (e) {
    next(e);
  }
});
