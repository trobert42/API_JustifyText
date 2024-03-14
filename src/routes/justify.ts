import { getWordsCount, updateWordsCount } from '../db/user';
import { getJustifiedTextString, countWords } from '../logic/justifyText';

const wordsLimitPerDay = Number(process.env.DAILY_WORD_LIMIT ?? '80000');

const updateUserWordsCount = async (
  email: string,
  nbrWordsToAdd: number,
  nbrActualWords: number,
) =>
  await updateWordsCount(email, nbrActualWords + nbrWordsToAdd).then((_) => {
    console.info(
      `Updated words (+${nbrWordsToAdd}) from user [${email}]: ` +
        (nbrActualWords + nbrWordsToAdd) +
        `/80,000 at ${Date()}`,
    );
  });

export const textJustifyHandler = async (
  email: string,
  textToJustify: string,
) => {
  try {
    const justifiedText = getJustifiedTextString(textToJustify);
    const nbrWordsToAdd: number = countWords(justifiedText);
    const nbrActualWords = await getWordsCount(email);

    if (nbrWordsToAdd + nbrActualWords > wordsLimitPerDay) {
      return {
        _tag: 'failed' as const,
        error: 'max_limit_reached' as const,
        remaining: wordsLimitPerDay - nbrActualWords,
      };
    }
    await updateUserWordsCount(email, nbrWordsToAdd, nbrActualWords);
    return {
      _tag: 'succeed' as const,
      justifiedText: justifiedText.toString(),
    };
  } catch (_) {
    return {
      _tag: 'failed' as const,
      error: 'internal_server_error' as const,
    };
  }
};
