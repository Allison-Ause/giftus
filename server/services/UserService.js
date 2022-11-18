import bcrypt from 'bcrypt';
import Users from '../models/Users.js';
import jwt from 'jsonwebtoken';

export default class UserService {
  static async signUp({ firstName, lastName, email, password }) {
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    console.log('UserService passwordHash', passwordHash);

    const user = await Users.insert({
      firstName,
      lastName,
      email,
      passwordHash,
    });

    console.log('UserService user', user);
    return user;
  }

  static async signIn({ email, password = '' }) {
    try {
      const user = await Users.getByEmail(email);
      console.log('user from signIn', user); //confirmed

      if (!user) throw new Error('Invalid Email. Please try again.');
      console.log(
        'password:',
        password,
        'user.passwordHash',
        user.passwordHash
      );
      if (!bcrypt.compareSync(password, user.passwordHash))
        throw new Error('Invalid password. Please try again.');

      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      console.log('token include jwt secret:', token);
      return token;
    } catch (error) {
      error.status = 401;
      throw error;
    }
  }
}
