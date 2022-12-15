import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  try {
    const cookie =
      req.cookies && req.cookies[process.env.COOKIE_NAME];
    if (!cookie) {
      res.status(401);
      res.send('Sign in to view.');
      return;
    }
    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

export default authenticate;
