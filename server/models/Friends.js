import pool from '../database.js';

export default class Friends {
  id;
  userId;
  name;
  birthday;
  address;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.name = row.name;
    this.birthday = row.birthday;
    this.address = row.address;
  }

  static async getAllFriends(userId) {
    const { rows } = await pool.query(
      `
    SELECT * FROM friends
    WHERE user_id = $1
    `,
      [userId]
    );
    return rows.map((friend) => new Friends(friend));
  }

  static async addFriend({ userId, name, birthday, address }) {
    const { rows } = await pool.query(
      `
    INSERT INTO friends (user_id, name, birthday, address)
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
      [userId, name, birthday, address]
    );
    return new Friends(rows[0]);
  }

  static async getFriendById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM friends
    WHERE id = $1`,
      [id]
    );
    console.log('rows from model', rows);
    if (rows.length === 0) {
      return null;
    }
    return new Friends(rows[0]);
  }
}
