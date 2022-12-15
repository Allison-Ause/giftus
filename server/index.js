/*******************************************************************************
 * This is the entry point for the server. This is separated from all of the
 * route registration to help Supertest auto-start the server without the server
 * having already been started. See
 * https://github.com/visionmedia/supertest/issues/697 for more context on this
 * issue.
 *
 * Any deployments will need to execute the transpiled version of this file.
 ******************************************************************************/

import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

if (!process.env.COOKIE_NAME) {
  console.error('COOKIE_NAME must be provided');
  process.exit(1);
}

// JWT_SECRET;
// SALT_ROUNDS;
// DATABASE_URL;

const server = app.listen(
  parseInt(process.env.PORT || '7890'),
  () => {
    console.log('Started server on ', server.address());
  }
);
