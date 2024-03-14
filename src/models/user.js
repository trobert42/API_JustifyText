"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db/db"));
exports.default = {
    createUser: async (email, token) => {
        const query = 'INSERT INTO users (email, token) VALUES ($1, $2) RETURNING *';
        const values = [email, token];
        const result = await db_1.default.query(query, values);
        return result.rows[0];
    },
    getUserFromEmail: async (email) => {
        const query = 'SELECT email FROM users WHERE email = $1';
        const values = [email];
        const result = await db_1.default.query(query, values);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0].email;
    },
    getWordsCount: async (email) => {
        const query = 'SELECT words_count FROM users WHERE email = $1';
        const values = [email];
        const result = await db_1.default.query(query, values);
        if (result.rows.length === 0) {
            return null;
        }
        return result.rows[0].words_count;
    },
    updateWordsCount: async (email, newWordsCount) => {
        const query = 'UPDATE users SET words_count = $1 WHERE email = $2';
        const values = [newWordsCount, email];
        await db_1.default.query(query, values);
    },
    updateAllUserWordsCount: async (newWordsCount) => {
        const query = 'UPDATE users SET words_count = $1';
        const values = [newWordsCount];
        await db_1.default.query(query, values);
    },
    getAllUsers: async () => {
        const query = 'SELECT id, email, words_count FROM users';
        const result = await db_1.default.query(query);
        return result.rows;
    },
};
