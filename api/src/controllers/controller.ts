import { Request, Response } from 'express';
import { createUser, updateUserWordsCount } from './userController';

const User = require('../models/user');
const jwt = require('jsonwebtoken');

const max_length_text = 80;
export interface AuthenticatedRequest extends Request {
  auth?: string;
}

export const defaultHandler = (req: Request, res: Response) => {
  return res.status(200).json({ error: `API not found at ${req.url}` });
};

const arrangeLineByLength = (oldTable: string[]) => {
  let wordsTab: string[] = [];
  let newTab: string[] = [];
  console.log('oldTable length = ' + oldTable.length);

  for (let j = 0; j < oldTable.length; j++) {
    wordsTab = oldTable[j].split(' ');
    console.log('wordsTab length = ' + oldTable[j].length);
    let ret: string = '';
    let word: string = '';
    let count: number = 0;
    for (let i = 0; i < wordsTab.length; i++) {
      word = wordsTab[i];
      count += word.length;
      if (count > max_length_text) {
        newTab.push(ret.substring(0, ret.length - 1));
        ret = '';
        count = word.length;
      }
      if (i === wordsTab.length - 1) {
        newTab.push((ret += word));
      }
      ret += word + ' ';
      count++;
    }
  }

  newTab.forEach((element) => {
    console.log('Lines after rearranging -- [' + element + ']');
  });
  console.log('------------');

  return newTab;
};

const getJustifiedTextString = (table: string[]) => {
  let justifiedText: string = '';

  table.forEach((line, index) => {
    if (index !== 0) justifiedText += '\n';
    let missingChar: number = max_length_text - line.length;
    const words: string[] = line.split(/(\s+)/);
    const length = words.length;
    let oneQuarter: number = Math.floor(length / 4);
    let i = 0;
    console.log(
      `Line (${line.length}) missing : ${missingChar} [` + line + ']',
    );
    while (missingChar > 0 && length > 1) {
      if (
        oneQuarter + i === Math.floor((length * 3) / 4) ||
        oneQuarter + i === length - 1
      )
        i = 0;
      words[oneQuarter + i] += ' ';
      missingChar--;
      i += 2;
    }
    const string: string = words.join('');
    console.log(`New line = [${string}]`);
    justifiedText += string;
  });
  return justifiedText;
};

const getTextJustify = (text: string) => {
  if (text.length <= max_length_text) return text;
  const lineSplitedTab: string[] = text.split('\n');
  //   const spaceSplitedTab: string[] = text.split(/(?<=\n)|(?=\n)| /);
  lineSplitedTab.forEach((element) => {
    console.log('Lines before -- [' + element + ']');
  });
  console.log('------------');
  return getJustifiedTextString(arrangeLineByLength(lineSplitedTab));
};

const countWords = (line: string) => {
  const tab: string[] = line.split(' ');
  return tab.length;
};

export const postTextJustifyHandler = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  if (!req.is('text/plain')) {
    return res.status(400).json({ error: `Content-Type wrong format` });
  }
  if (!req.body) {
    return res.status(400).json({ error: `Empty body` });
  }
  const justifiedText = getTextJustify(req.body);
  const nbrWordsToAdd: number = countWords(justifiedText);
  const nbrActualWords: number = await User.getWordsCount(req.auth);

  if (nbrWordsToAdd + nbrActualWords > 80000) {
    return res.status(402).json({
      error:
        `Exceeds rate limit, number left of words authorized: ` +
        (80000 - nbrActualWords),
    });
  }
  updateUserWordsCount(req, res, nbrWordsToAdd, nbrActualWords);
  res
    .status(200)
    .setHeader('Content-Type', 'text/plain')
    .send(justifiedText.toString());
};

const generateToken = (email: string) => {
  const token = jwt.sign({ email: email }, process.env.JWT_SECRET);
  return token;
};

export const postTokenHandler = (req: Request, res: Response) => {
  const email = req.body['email'];
  if (!req.body || !email) {
    return res
      .status(400)
      .json({ error: `Bad request, missing body or email` });
  }
  const token = generateToken(email);
  if (!token) {
    return res.status(500).json({ error: `Unable to retrieve token` });
  }
  createUser(req, res, token);
};
