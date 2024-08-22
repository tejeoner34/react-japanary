import axios from 'axios';
import { DictionaryDataSource } from './dictionaryDataSource';
import { ExampleSentence, SearchResult } from '@/dictionary/models/searchResult';

const BASE_URL: string = import.meta.env.VITE_DICTIONARY_BASE_URL + 'dictionary';

export class DictionaryDataSourceImpl implements DictionaryDataSource {
  async searchSampleSenteces(word: string): Promise<ExampleSentence[]> {
    const response = await axios.get<ExampleSentence[]>(
      `${BASE_URL}/sample-sentence?keyword=${word}`
    );
    return response.data;
  }
  async searchWord(word: string): Promise<SearchResult[]> {
    const response = await axios.get<SearchResult[]>(`${BASE_URL}?keyword=${word}`);
    return response.data;
  }
}
