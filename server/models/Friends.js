import { ids } from 'webpack';

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
      [user_id]
    );
    return rows.map((friend) => new Friends(friend));
  }
}
