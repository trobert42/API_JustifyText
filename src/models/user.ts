import pool from '../db/db';

type UserModel = {
  email: string;
  id: number;
  token: string;
  words_count: number;
};

export default {
  createUser: async (email: string, token: string) => {
    const query =
      'INSERT INTO users (email, token) VALUES ($1, $2) RETURNING *';
    const values = [email, token];
    const result = await pool.query<UserModel>(query, values);
    return result.rows[0];
  },
  getUserFromEmail: async (email: string) => {
    const query = 'SELECT email FROM users WHERE email = $1';
    const values = [email];
    const result = await pool.query<Pick<UserModel, 'email'>>(query, values);
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0].email;
  },

  getWordsCount: async (email: string) => {
    const query = 'SELECT words_count FROM users WHERE email = $1';
    const values = [email];
    const result = await pool.query<Omit<UserModel, 'id' | 'email' | 'token'>>(
      query,
      values,
    );
    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0].words_count;
  },

  updateWordsCount: async (email: string, newWordsCount: number) => {
    const query = 'UPDATE users SET words_count = $1 WHERE email = $2';
    const values = [newWordsCount, email];
    await pool.query(query, values);
  },

  updateAllUserWordsCount: async (newWordsCount: number) => {
    const query = 'UPDATE users SET words_count = $1';
    const values = [newWordsCount];
    await pool.query(query, values);
  },

  getAllUsers: async () => {
    const query = 'SELECT id, email, words_count FROM users';
    const result = await pool.query(query);
    return result.rows;
  },
};
