import { Request, Response } from 'express';
import { createUser, updateUserWordsCount } from './userController';

const User = require('../models/user');

export const defaultHandler = (req: Request, res: Response) => {
  return res.status(200).json({ error: `API not found at ${req.url}` });
};

const splitTable = (table: string[]) => {
  let splitedTab: string[] = [];
  let ret: string = '';
  let count: number = 0;

  for (let i = 0; i < table.length; i++) {
    const word = table[i];
    count += word.length;
    if (count > 80) {
      splitedTab.push(ret.substring(0, ret.length - 1));
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
    let middle: number = Math.floor(words.length / 2);
    let i = 0;
    console.log(`Line (${line.length}) [` + line + ']');
    while (missingChar > 0 && words.length > 1) {
      //   if (middle + i < words.length) {
      //   console.log(middle + i);
      words[middle + i] += ' ';
      missingChar--;
      //   }
      //   if (middle - i > 0) {
      //     words[i] += ' ';
      //     missingChar--;
      //   }
      i += 2;
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

  //   for (let line of spaceSplitedTab) {
  //     const length: number = line.length;
  //     console.log(`Line (${length}) = ` + line);
  //   }

  return getJustifiedTextString(splitedTab);
};

const countWords = (line: string) => {
  const tab: string[] = line.split(' ');
  return tab.length;
};

export const postTextJustifyHandler = async (req: Request, res: Response) => {
  //   const token = req.headers['authorization'];
  //   if (!token) {
  //     return res.status(401).json({ error: 'Unauthorized' });
  //   }
  // check token match
  if (!req.is('text/plain')) {
    return res.status(400).json({ error: `Content-Type wrong format` });
  }
  if (!req.body) {
    return res.status(400).json({ error: `Empty body` });
  }
  const justifiedText = getTextJustify(req.body);
  const nbrWordsToAdd: number = countWords(justifiedText);
  const nbrActualWords: number = await User.getUserWordsCount('toto@tata.com');

  if (nbrWordsToAdd + nbrActualWords > 80000) {
    return res.status(402).json({
      error:
        `Exceeds rate limit, number left of words authorized: ` +
        (80000 - nbrActualWords),
    });
  }
  updateUserWordsCount(req, res, nbrWordsToAdd, nbrActualWords);
  res.status(200).setHeader('Content-Type', 'text/plain').send(justifiedText);
};

export const postTokenHandler = (req: Request, res: Response) => {
  const email = req.body['email'];
  if (!req.body || !email) {
    return res
      .status(400)
      .json({ error: `Bad request, missing body or email` });
  }
  createUser(req, res);
};
