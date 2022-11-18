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

  static async addGift({ userId, idea, link, price, occasion }) {
    const { rows } = await pool.query(
      `
    INSERT INTO gifts (userId, idea, link, price, occasion)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
      [idea, link, price, occasion, userId]
    );
    console.log('rows from addGift model', rows);
    return new Gifts(rows[0]);
  }
}
