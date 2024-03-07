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

const getTextJustify = (text: string) => {
  if (text.length <= 80) return text;
};

export const postTextJustifyHandler = (req: Request, res: Response) => {
  console.log('The request body :', req.body);
  console.log('Content-Type :', req.headers['content-type']);
  // check headers authorizartion bearer !null
  // check token match
  // check body content-type && !null
  if (!req.is('text/plain')) {
    res.status(400);
    throw new Error('Content-Type wrong format');
  }
  if (!req.body) {
    res.status(400);
    throw new Error('Body is empty');
  }
  const justifiedText = getTextJustify(req.body);
  // check rate limit -> 402

  // add words/day in db
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.send(justifiedText);
};

export const postTokenHandler = (req: Request, res: Response) => {
  const email = req.body['email'];
  if (!req.body || !email) {
    res.status(400);
    throw new Error('No email');
  }
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
