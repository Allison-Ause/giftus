import pool from '../database';

export default class Gifts {
  id;
  user_id;
  idea;
  link;
  price;
  occasion;
  is_purchased;
  created_at;

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

  static async addGift({ idea, link, price, occasion, userId }) {
    const { rows } = await pool.query(
      `
    INSERT INTO gifts (idea, link, price, occasion, userId)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
      [idea, link, price, occasion, userId]
    );
    return new Gifts(rows[0]);
  }
}
