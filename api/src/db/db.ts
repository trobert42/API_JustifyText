const { Pool, PoolClient } = require('pg');
import pg from 'pg';

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

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

pool.connect((err: Error, client: typeof PoolClient, release: () => void) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to PostgreSQL database');
  client.query(
    `
	  CREATE TABLE IF NOT EXISTS users (
		  id SERIAL PRIMARY KEY,
		  email VARCHAR(255) NOT NULL,
		  token VARCHAR(255) NOT NULL,
		  words_count INT DEFAULT 0
	  )
  `,
    (err: Error, result: pg.QueryResult<any>) => {
      release();
      if (err) {
        return console.error('Error executing query', err.stack);
      }
      console.log('Table "users" created successfully');
      console.log('-------------------------------------------');
    },
  );
});

export default pool;
