import express, { Response, Request } from 'express';

const app = express();
const pool = require('./db/db');
const hostname = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT ?? '3000');
const routes = require('./routes/routes.ts');

app.use((req, res, next) => {
  if (req.headers['content-type'] === 'application/json') {
    express.json()(req, res, next);
  } else if (req.headers['content-type'] === 'text/plain') {
    express.text()(req, res, next);
  } else {
    next();
  }
});

app.use('/', routes);

app.listen(port, () => {
  console.log(`Server listening at http://${hostname}:${port}/`);
});
