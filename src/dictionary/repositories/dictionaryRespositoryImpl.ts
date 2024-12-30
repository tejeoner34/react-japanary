import { AiResponse, ExampleSentence, SearchResult } from '@/dictionary/models/searchResult';
import { DictionaryRepository } from './dictionaryRepository';
import { DictionaryDataSource } from '@/dictionary/infrastructure/datas-sources/dictionaryDataSource';

export class DictionaryRepositoryImpl implements DictionaryRepository {
  private dataSource: DictionaryDataSource;
  constructor(dataSource: DictionaryDataSource) {
    this.dataSource = dataSource;
  }
  async searchAi(word: string): Promise<AiResponse> {
    return this.dataSource.searchAi(word);
  }
  async searchSampleSenteces(word: string): Promise<ExampleSentence[]> {
    return this.dataSource.searchSampleSenteces(word);
  }
  async searchWord(word: string): Promise<SearchResult[]> {
    return this.dataSource.searchWord(word);
  }
}

export const initializeRepository = (dataSource: DictionaryDataSource): DictionaryRepositoryImpl =>
  new DictionaryRepositoryImpl(dataSource);
