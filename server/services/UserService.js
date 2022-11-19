import bcrypt from 'bcrypt';
import Users from '../models/Users.js';
import jwt from 'jsonwebtoken';

export default class UserService {
  static async signUp({ firstName, lastName, email, password }) {
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user = await Users.insert({
      firstName,
      lastName,
      email,
      passwordHash,
    });

    return user;
  }

  static async signIn({ email, password = '' }) {
    try {
      const user = await Users.getByEmail(email);

      if (!user) throw new Error('Invalid Email. Please try again.');
      if (!bcrypt.compareSync(password, user.passwordHash))
        throw new Error('Invalid password. Please try again.');

      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      return token;
    } catch (error) {
      error.status = 401;
      throw error;
    }
  }
}
