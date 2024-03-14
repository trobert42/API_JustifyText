"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJustifiedTextString = exports.justifyLines = exports.arrangeLinesByLength = exports.countWords = exports.setToZeroWordsCount = void 0;
const user_1 = __importDefault(require("../models/user"));
const lineLenLimit = 80;
const setToZeroWordsCount = async () => {
    await user_1.default.updateAllUserWordsCount(0);
};
exports.setToZeroWordsCount = setToZeroWordsCount;
const countWords = (line) => {
    const wordsTab = line.split(/\s+/);
    return wordsTab.length;
};
exports.countWords = countWords;
const arrangeLinesByLength = (oldTable) => {
    const newTab = [];
    for (let j = 0; j < oldTable.length; j++) {
        const wordsTab = oldTable[j].split(' ');
        let newLine = '';
        let word = '';
        let countCharacters = 0;
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
exports.arrangeLinesByLength = arrangeLinesByLength;
const justifyLines = (lineTab) => {
    let justifiedText = '';
    lineTab.forEach((line, index) => {
        if (index !== 0) {
            justifiedText += '\n';
        }
        const wordsTab = line.split(/(\s+)/);
        const nbrWords = wordsTab.length;
        let missingChar = lineLenLimit - line.length;
        let i = 0;
        while (missingChar > 0 && nbrWords > 1) {
            if (i === nbrWords - 1) {
                i = 0;
            }
            wordsTab[i] += ' ';
            missingChar--;
            i += 2;
        }
        const newLine = wordsTab.join('');
        justifiedText += newLine;
    });
    return justifiedText;
};
exports.justifyLines = justifyLines;
const getJustifiedTextString = (text) => {
    if (text.length <= lineLenLimit) {
        return text;
    }
    const lineSplitedTab = text.split('\n');
    return (0, exports.justifyLines)((0, exports.arrangeLinesByLength)(lineSplitedTab));
};
exports.getJustifiedTextString = getJustifiedTextString;
