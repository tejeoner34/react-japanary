import axios from 'axios';
import { SearchResult, Sense } from '@/models/dictionary/searchResult';
import { DictionaryDataSource } from './dictionaryDataSource';
import { SearchResultApi, SenseApi } from '@/models/dictionary/searchResultApi';

const BASE_URL = 'http://127.0.0.1:5000/';

export class DictionaryDataSourceImpl implements DictionaryDataSource {
  async searchWord(word: string): Promise<SearchResult[]> {
    const response = await axios.get<SearchResultApi[]>(`${BASE_URL}?keyword=${word}`);
    const adaptedData = dictionaryListAdapter(response.data);
    return adaptedData;
  }
}

const dictionaryAdapter = (apiResponse: SearchResultApi): SearchResult => {
  return {
    slug: apiResponse.slug,
    isCommon: !!apiResponse.is_common,
    japaneseReadings: apiResponse.japanese,
    jlptLevels: apiResponse.jlpt,
    senses: sensesAdapter(apiResponse.senses),
  };
};

const dictionaryListAdapter = (rawData: SearchResultApi[]): SearchResult[] => {
  return rawData.map((item) => dictionaryAdapter(item));
};

const sensesAdapter = (senses: SenseApi[]): Sense[] => {
  return senses.map((sense) => ({
    englishDefinitions: sense.english_definitions,
    seeAlso: sense.see_also,
    tags: sense.tags,
    wordTypes: sense.parts_of_speech,
    sentences: sense.sentences,
  }));
};
