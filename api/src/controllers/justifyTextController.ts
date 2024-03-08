const User = require('../models/user');
const max_length_text = 80;

export const setToZeroWordsCount = async () => {
  await User.updateAllUserWordsCount(0);
};

export const arrangeLinesByLength = (oldTable: string[]) => {
  let newTab: string[] = [];

  for (let j = 0; j < oldTable.length; j++) {
    let wordsTab: string[] = oldTable[j].split(' ');
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
  return newTab;
};

export const justifyLines = (table: string[]) => {
  let justifiedText: string = '';

  table.forEach((line, index) => {
    if (index !== 0) justifiedText += '\n';
    const words: string[] = line.split(/(\s+)/);
    const length = words.length;
    let oneQuarter: number = Math.floor(length / 4);
    let missingChar: number = max_length_text - line.length;
    let i = 0;

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
    justifiedText += string;
  });
  return justifiedText;
};

export const getJustifiedTextString = (text: string) => {
  if (text.length <= max_length_text) return text;
  const lineSplitedTab: string[] = text.split('\n');
  return justifyLines(arrangeLinesByLength(lineSplitedTab));
};

export const countWords = (line: string) => {
  const tab: string[] = line.split(' ');
  return tab.length;
};
