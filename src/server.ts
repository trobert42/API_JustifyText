import type { Response, Request } from 'express';
import express from 'express';

import { router } from './routes/routes';
import type { HttpError } from './types/types';
import cron from './utils/cron';
import { getEnvs } from './utils/getEnvs';

getEnvs();
cron();

const app = express();
const hostname = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT ?? '3000');

app.use((req: Request, res: Response, next) => {
  if (req.headers['content-type'] === 'application/json') {
    express.json()(req, res, next);
  } else if (req.headers['content-type'] === 'text/plain') {
    express.text()(req, res, next);
  } else {
    next();
  }
});

app.use((err: HttpError, _: Request, res: Response): void => {
  res.status(err.statusCode || 500).json({ error: err.message });
});

app.use('/', router);

app.listen(port, () => {
  console.info(`Server listening at http://${hostname}:${port}/`);
});

export default app;
