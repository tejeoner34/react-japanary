import { AiResponse, ExampleSentence, SearchResult } from '@/dictionary/models/searchResult';
import { DictionaryDataSource } from './dictionaryDataSource';
import { SAMPLE_SENTENCES_MOCK, WORD_QUERY_MOCK } from '@/dictionary/mocks/dictionary.mocks';

export class DictionaryDSMockImpl implements DictionaryDataSource {
  searchMeaningInJapaneseAi(word: string): Promise<AiResponse> {
    console.log(word);
    throw new Error('Method not implemented.');
  }
  searchCompareWords(words: string[]): Promise<AiResponse> {
    console.log(words);
    throw new Error('Method not implemented.');
  }
  searchAi(word: string): Promise<AiResponse> {
    console.log(word);
    throw new Error('Method not implemented.');
  }
  searchSampleSenteces(word: string): Promise<ExampleSentence[]> {
    console.log(word);
    return new Promise((resolve) => {
      resolve(SAMPLE_SENTENCES_MOCK);
    });
  }
  async searchWord(word: string): Promise<SearchResult[]> {
    console.log(word);
    return new Promise((resolve) => {
      resolve(WORD_QUERY_MOCK);
    });
  }
}
