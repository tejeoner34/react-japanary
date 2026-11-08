import axios, { CancelTokenSource } from 'axios';
import { DictionaryDataSource } from './dictionaryDataSource';
import { AiResponse, ExampleSentence, SearchResult } from '@/dictionary/models/searchResult';
import { JishoApiResponse, jishoAdapter } from '@/dictionary/infrastructure/adapters/jishoAdapter';
import {
  TatoebaApiResponse,
  tatoebaAdapter,
} from '@/dictionary/infrastructure/adapters/tatoebaAdapter';

const AI_BASE_URL: string = import.meta.env.VITE_DICTIONARY_BASE_URL + 'dictionary';
const JISHO_PROXY_URL = '/proxy/jisho';
const TATOEBA_PROXY_URL = '/proxy/tatoeba';

export class DictionaryDataSourceImpl implements DictionaryDataSource {
  _sentenceCancelToken: null | CancelTokenSource = null;
  _wordCancelToken: null | CancelTokenSource = null;

  async searchSampleSenteces(word: string): Promise<ExampleSentence[]> {
    if (this._sentenceCancelToken) {
      this._sentenceCancelToken.cancel();
    }
    this._sentenceCancelToken = axios.CancelToken.source();
    const response = await axios.get<TatoebaApiResponse>(
      `${TATOEBA_PROXY_URL}?from=jpn&to=eng&query=${encodeURIComponent(word)}`,
      {
        cancelToken: this._sentenceCancelToken.token,
      }
    );
    return tatoebaAdapter(response.data);
  }
  async searchWord(word: string): Promise<SearchResult[]> {
    if (this._wordCancelToken) {
      this._wordCancelToken.cancel();
    }
    this._wordCancelToken = axios.CancelToken.source();
    const response = await axios.get<JishoApiResponse>(
      `${JISHO_PROXY_URL}?keyword=${encodeURIComponent(word)}`,
      {
        cancelToken: this._wordCancelToken.token,
      }
    );
    return jishoAdapter(response.data);
  }

  async searchAi(word: string): Promise<AiResponse> {
    try {
      const response = await axios.get<AiResponse>(`${AI_BASE_URL}/search-ai?keyword=${word}`);
      return response.data;
    } catch (error) {
      throw new Error('Something went wrong while searching the word');
    }
  }

  async searchCompareWords(words: string[]): Promise<AiResponse> {
    try {
      const response = await axios.post<AiResponse>(`${AI_BASE_URL}/compare-words`, {
        words,
      });
      return response.data;
    } catch (error) {
      console.error('Error comparing words:', error);
      throw new Error('Something went wrong while comparing words');
    }
  }

  async searchMeaningInJapaneseAi(word: string): Promise<AiResponse> {
    try {
      const response = await axios.get<AiResponse>(
        `${AI_BASE_URL}/meaning-in-japanese?keyword=${word}`
      );
      return response.data;
    } catch (error) {
      console.error('Error searching meaning in Japanese AI:', error);
      throw new Error('Something went wrong while searching meaning in Japanese AI');
    }
  }
}
