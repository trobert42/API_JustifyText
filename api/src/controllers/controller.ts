import { Request, Response } from 'express';

export const defaultHandler = (req: Request, res: Response) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.write(
    JSON.stringify({
      message: `API not found at ${req.url}`,
    }),
  );
  res.end();
};

export const postTextJustifyHandler = (req: Request, res: Response) => {
  res.statusCode = 200;
  console.log('The request body :', req.body);
  const email = req.body['email'];
  if (!req.body || !email) {
    res.status(400);
    throw new Error('No email');
  }
  res.setHeader('Content-Type', 'application/json');
  res.write(
    JSON.stringify({
      message: `POST successful`,
    }),
  );
  res.end();
};

export const postTokenHandler = (req: Request, res: Response) => {
  res.statusCode = 200;
  console.log('The request body: ', req.body);
  res.setHeader('Content-Type', 'application/json');
  res.write(
    JSON.stringify({
      message: `POST successful`,
    }),
  );
  res.end();
};
