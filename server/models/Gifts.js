import pool from '../database.js';

export default class Gifts {
  id;
  userId;
  idea;
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
    this.link = row.link;
    this.price = row.price;
    this.occasion = row.occasion;
    this.isPurchased = row.is_purchased;
    this.createdAt = row.created_at;
  }

  static async getAllGifts(userId) {
    const { rows } = await pool.query(
      `
    SELECT * FROM gifts
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
      [userId]
    );
    return rows.map((gift) => new Gifts(gift));
  }

  static async addGift({ userId, idea, link, price, occasion }) {
    const { rows } = await pool.query(
      `
    INSERT INTO gifts (user_id, idea, link, price, occasion)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
      [userId, idea, link, price, occasion]
    );
    return new Gifts(rows[0]);
  }
}
