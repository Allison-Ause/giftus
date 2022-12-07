import pool from '../database.js';

export default class Gifts {
  id;
  userId;
  idea;
  friendId;
  link;
  price;
  occasion;
  isPurchased;
  createdAt;

  // left hand is key (can be renamed) and right hand is value (coming from table)
  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.idea = row.idea;
    this.friendId = row.friend_id;
    this.link = row.link;
    this.price = row.price;
    this.occasion = row.occasion;
    this.isPurchased = row.is_purchased;
    this.createdAt = row.created_at;
    if (row.friend) {
      this.friend = row.friend[0];
    }
  }

  // SELECT * FROM gifts
  // WHERE user_id = $1
  // ORDER BY created_at DESC

  // SELECT gifts.*, friends.* FROM gifts
  // INNER JOIN friends ON friend_id = friends.id
  // WHERE gifts.user_id = $1

  // sub a coalesce call to create a Friend Object here
  static async getAllGifts(userId) {
    const { rows } = await pool.query(
      `
    SELECT gifts.*, 
    COALESCE(
      json_agg(to_jsonb(friends))
      FILTER (WHERE friends.id IS NOT NULL), '[]'
    ) as friend from gifts
INNER JOIN friends ON friend_id = friends.id
WHERE gifts.user_id = $1
GROUP BY gifts.id
ORDER BY created_at DESC
    `,
      [userId]
    );
    return rows.map((gift) => new Gifts(gift));
  }

  static async addGift({
    userId,
    idea,
    friendId,
    link,
    price,
    occasion,
  }) {
    const { rows } = await pool.query(
      `
    INSERT INTO gifts (user_id, idea, friend_id, link, price, occasion)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
      [userId, idea, friendId, link, price, occasion]
    );
    console.log('addGift rows:', rows);
    return new Gifts(rows[0]);
  }

  static async deleteGift(id) {
    const { rows } = await pool.query(
      `
    DELETE FROM gifts
    WHERE id = $1
    RETURNING *
    `,
      [id]
    );
    return new Gifts(rows[0]);
  }

  // SELECT * FROM gifts
  // WHERE id = $1

  static async getGiftById(id) {
    const { rows } = await pool.query(
      `
    SELECT gifts.*, 
    COALESCE(
      json_agg(to_jsonb(friends))
      FILTER (WHERE friends.id IS NOT NULL), '[]'
    ) as friend from gifts
INNER JOIN friends ON friend_id = friends.id
WHERE gifts.id = $1
GROUP BY gifts.id
    `,
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return new Gifts(rows[0]);
  }

  static async updateGift(props) {
    const originalGift = await Gifts.getGiftById(props.id);
    const updatedGift = { ...originalGift, ...props };

    const { rows } = await pool.query(
      `
    UPDATE gifts
    SET idea = $2, friend_id = $3, link = $4, price = $5, occasion = $6
    WHERE id = $1
    RETURNING *
    `,
      [
        updatedGift.id,
        updatedGift.idea,
        updatedGift.friend.id,
        updatedGift.link,
        updatedGift.price,
        updatedGift.occasion,
      ]
    );
    return new Gifts(rows[0]);
  }
}
