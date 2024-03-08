import pool from '../db/db';
class User {
  static async createUser(email: string, token: string) {
    const query =
      'INSERT INTO users (email, token) VALUES ($1, $2) RETURNING *';
    const values = [email, token];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getUserFromEmail(email: string) {
    const query = 'SELECT email FROM users WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0].email;
  }

  static async getWordsCount(email: string) {
    const query = 'SELECT words_count FROM users WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0].words_count;
  }

  static async updateWordsCount(email: string, newWordsCount: number) {
    const query = 'UPDATE users SET words_count = $1 WHERE email = $2';
    const values = [newWordsCount, email];
    await pool.query(query, values);
  }

  static async updateAllUserWordsCount(newWordsCount: number) {
    const query = 'UPDATE users SET words_count = $1';
    const values = [newWordsCount];
    await pool.query(query, values);
  }

  static async getAllUsers() {
    const query = 'SELECT id, email, words_count FROM users';
    const result = await pool.query(query);
    return result.rows;
  }
}

module.exports = User;
