import { ExampleSentence } from '../models/searchResult';

export const formatSampleSentenceToString = (
  sampleSentence: ExampleSentence
): { japanese: string; english: string } => {
  let japaseseSentence = '';
  sampleSentence.japanese.forEach((item) => {
    japaseseSentence += `${item.word}`;
  });

  return {
    japanese: japaseseSentence,
    english: sampleSentence.english,
  };
};
