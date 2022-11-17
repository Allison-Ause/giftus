import { Router } from 'express';
import db from '../database.js';

export default Router()
  .get('/', (req, res, next) => {
    return db
      .query('select * from foos;')
      .then((result) => res.send(result.rows))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    if (
      req.params.id != null &&
      Number.isInteger(parseInt(req.params.id))
    ) {
      return db
        .query('delete from foos where foos.id = $1;', [
          req.params.id,
        ])
        .then(() => res.sendStatus(201))
        .catch(next);
    } else {
      console.error(
        `id to delete is not a valid id: ${JSON.stringify(
          req.params.id
        )}`
      );
      res.status(400);
    }
  });
