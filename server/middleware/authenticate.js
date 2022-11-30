import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  try {
    const cookie =
      req.cookies && req.cookies[process.env.COOKIE_NAME];
    if (!cookie) throw new Error('Sign in to view.');
    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};

export default authenticate;
