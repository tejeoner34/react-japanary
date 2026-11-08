import { SearchResult, Sense } from '@/dictionary/models/searchResult';

export interface JishoSenseApi {
  english_definitions: string[];
  parts_of_speech: string[];
  tags: string[];
  see_also: string[];
  sentences?: string[];
}

export interface JishoWordApi {
  slug: string;
  is_common: boolean;
  jlpt: string[];
  japanese: { word?: string; reading: string }[];
  senses: JishoSenseApi[];
}

export interface JishoApiResponse {
  data: JishoWordApi[];
}

const senseAdapter = (sense: JishoSenseApi): Sense => {
  const adaptedSense: Sense = {
    englishDefinitions: sense.english_definitions,
    seeAlso: sense.see_also,
    tags: sense.tags,
    wordTypes: sense.parts_of_speech,
  };
  if (sense.sentences) {
    adaptedSense.sentences = sense.sentences;
  }
  return adaptedSense;
};

const wordAdapter = (word: JishoWordApi): SearchResult => ({
  slug: word.slug,
  isCommon: !!word.is_common,
  jlptLevels: word.jlpt,
  japaneseReadings: word.japanese,
  senses: word.senses.map(senseAdapter),
});

export const jishoAdapter = (rawResult: JishoApiResponse): SearchResult[] =>
  rawResult.data.map(wordAdapter);
