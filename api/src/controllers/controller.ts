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

const splitTable = (table: string[]) => {
  let splitedTab: string[] = [];
  let ret: string = '';
  let count: number = 0;

  for (let i = 0; i < table.length; i++) {
    const word = table[i];

    count += word.length;
    if (count > 80) {
      splitedTab.push(ret);
      ret = '';
      count = word.length;
    }
    if (i === table.length - 1) {
      splitedTab.push((ret += word));
      break;
    }
    ret += word + ' ';
    count++;
  }
  return splitedTab;
};

const getJustifiedTextString = (table: string[]) => {
  let justifiedText: string = '';

  table.forEach((line, index) => {
    if (index !== 0) justifiedText += '\n';
    let missingChar: number = 80 - line.length;
    const words: string[] = line.split(/(\s+)/);
    let middle: number = words.length / 2;
    let i = 1;

    while (missingChar > 0 && words.length > 1) {
      middle = words.length / 2;
      if (middle + i < words.length) {
        words.splice(middle + i, 0, ' ');
        missingChar--;
      }
      if (missingChar > 0 && middle - i >= 0) {
        words.splice(middle - i, 0, ' ');
        missingChar--;
        i += 3;
      }
    }
    const string: string = words.join('');
    justifiedText += string;
  });
  return justifiedText;
};

const getTextJustify = (text: string) => {
  if (text.length <= 80) return text;
  const spaceSplitedTab: string[] = text.split(' ');
  let splitedTab: string[] = splitTable(spaceSplitedTab);

  //   for (let line of splitedTab) {
  //     const length: number = line.length;
  //     console.log(`Line (${length}) = ` + line);
  //   }

  return getJustifiedTextString(splitedTab);
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
