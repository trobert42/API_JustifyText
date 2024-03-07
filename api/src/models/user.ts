import pool from '../db/db';

class User {
  static async createUser(email: string, token: string) {
    const query =
      'INSERT INTO users (email, token) VALUES ($1, $2) RETURNING *';
    const values = [email, token];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = User;
