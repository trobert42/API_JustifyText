import User from '../models/user';

const lineLenLimit = 80;

export const setToZeroWordsCount = async () => {
  await User.updateAllUserWordsCount(0);
};

export const countWords = (line: string) => {
  const wordsTab: string[] = line.split(/\s+/);
  return wordsTab.length;
};

export const arrangeLinesByLength = (oldTable: string[]) => {
  const newTab: string[] = [];

  for (let j = 0; j < oldTable.length; j++) {
    const wordsTab: string[] = oldTable[j].split(' ');
    let newLine: string = '';
    let word: string = '';
    let countCharacters: number = 0;
    for (let i = 0; i < wordsTab.length; i++) {
      word = wordsTab[i];
      countCharacters += word.length;
      if (countCharacters > lineLenLimit) {
        newTab.push(newLine.substring(0, newLine.length - 1));
        newLine = '';
        countCharacters = word.length;
      }
      if (i === wordsTab.length - 1) {
        newTab.push((newLine += word));
      }
      newLine += word + ' ';
      countCharacters++;
    }
  }
  return newTab;
};

export const justifyLines = (lineTab: string[]) => {
  let justifiedText: string = '';

  lineTab.forEach((line, index) => {
    if (index !== 0) {justifiedText += '\n';}

    const wordsTab: string[] = line.split(/(\s+)/);
    const nbrWords = wordsTab.length;
    let missingChar: number = lineLenLimit - line.length;
    let i = 0;

    while (missingChar > 0 && nbrWords > 1) {
      if (i === nbrWords - 1) {i = 0;}
      wordsTab[i] += ' ';
      missingChar--;
      i += 2;
    }
    const newLine: string = wordsTab.join('');
    justifiedText += newLine;
  });
  return justifiedText;
};

export const getJustifiedTextString = (text: string) => {
  if (text.length <= lineLenLimit) {return text;}
  const lineSplitedTab: string[] = text.split('\n');
  return justifyLines(arrangeLinesByLength(lineSplitedTab));
};
