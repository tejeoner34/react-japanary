import { ExampleSentence } from '@/dictionary/models/searchResult';

export interface TatoebaTranslation {
  text: string;
}

export interface TatoebaSentence {
  text: string;
  translations: (TatoebaTranslation[] | [])[];
}

export interface TatoebaApiResponse {
  results: TatoebaSentence[];
}

export const tatoebaAdapter = (rawResult: TatoebaApiResponse): ExampleSentence[] =>
  rawResult.results.map((result) => ({
    english: result.translations?.[0]?.[0]?.text || '',
    japanese: result.text.split(' ').map((word) => ({
      furigana: '',
      word,
    })),
  }));
