import axios, { CancelTokenSource } from 'axios';
import { DictionaryDataSource } from './dictionaryDataSource';
import { ExampleSentence, SearchResult } from '@/dictionary/models/searchResult';

const BASE_URL: string = import.meta.env.VITE_DICTIONARY_BASE_URL + 'dictionary';

export class DictionaryDataSourceImpl implements DictionaryDataSource {
  _sentenceCancelToken: null | CancelTokenSource = null;
  _wordCancelToken: null | CancelTokenSource = null;

  async searchSampleSenteces(word: string): Promise<ExampleSentence[]> {
    if (this._sentenceCancelToken) {
      this._sentenceCancelToken.cancel();
    }
    this._sentenceCancelToken = axios.CancelToken.source();
    const response = await axios.get<ExampleSentence[]>(
      `${BASE_URL}/sample-sentence?keyword=${word}`,
      {
        cancelToken: this._sentenceCancelToken.token,
      }
    );
    return response.data;
  }
  async searchWord(word: string): Promise<SearchResult[]> {
    if (this._wordCancelToken) {
      this._wordCancelToken.cancel();
    }
    this._wordCancelToken = axios.CancelToken.source();
    const response = await axios.get<SearchResult[]>(`${BASE_URL}?keyword=${word}`, {
      cancelToken: this._wordCancelToken.token,
    });
    return response.data;
  }
}
