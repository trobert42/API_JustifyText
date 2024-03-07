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

//ca fait 80 caracteres, il y a des espaces et des mots, cela ne fait qu'une ligne
const getTextJustify = (text: string) => {
  if (text.length <= 80) return text;
  const tab: string[] = text.split(' ');
  let tab2: string[] = [];
  let ret: string = '';

  let count: number = 0;
  for (let i = 0; i < tab.length; i++) {
    const word = tab[i];
    count += word.length;
    if (count > 80) {
      tab2.push(ret);
      ret = '';
      count = word.length;
    }
    ret += word + ' ';
    count++;

    if (i === tab.length - 1) {
      tab2.push((ret += word));
    }
  }
  for (let index of tab2) {
    console.log(`tab [] = ` + index);
  }
  return ret;
};

export const postTextJustifyHandler = (req: Request, res: Response) => {
  //   console.log('The request body \n[' + req.body + ']');
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
