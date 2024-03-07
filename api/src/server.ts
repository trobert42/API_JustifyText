import express, { Response, Request } from 'express';

const app = express();
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT ?? '3000');
const routes = require('./routes/routes.js');

app.use(express.json()); //middleware
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server listening at http://${hostname}:${port}/`);
});
