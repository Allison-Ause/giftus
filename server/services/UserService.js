import bcrypt from 'bcrypt';
import Users from '../models/Users.js';

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
}
