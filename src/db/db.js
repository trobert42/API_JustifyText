"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
/* ONLY FOR LOCAL TEST */
// const POSTGRES_LOCAL_HOST: string = '172.18.0.2';
// const POSTGRES_PWD: string = '123';
// const POSTGRES_USER: string = 'user';
// const POSTGRES_DB: string = 'postgres';
/* FOR DOCKER */
// user: process.env.POSTGRES_USER,
// host: process.env.POSTGRES_HOST,
// database: process.env.POSTGRES_DB,
// password: process.env.POSTGRES_PASSWORD,
const pool = new pg_1.Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
});
pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to PostgreSQL database');
    client?.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      token VARCHAR(255) NOT NULL,
      words_count INT DEFAULT 0
    )
  `, (err) => {
        release();
        if (err) {
            return console.error('Error executing query', err.stack);
        }
        console.log('Table "users" created successfully');
        console.log('-------------------------------------------');
    });
});
exports.default = pool;
