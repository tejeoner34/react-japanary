import { SearchResult } from '@/models/dictionary/searchResult';
import { DictionaryRepository } from './dictionaryRepository';
import { DictionaryDataSource } from '@/infrastructure/datas-sources/dictionary/dictionaryDataSource';

export class DictionaryRepositoryImpl implements DictionaryRepository {
  private dataSource: DictionaryDataSource;
  constructor(dataSource: DictionaryDataSource) {
    this.dataSource = dataSource;
  }
  async searchWord(word: string): Promise<SearchResult[]> {
    return this.dataSource.searchWord(word);
  }
}

export const initializeRepository = (dataSource: DictionaryDataSource): DictionaryRepositoryImpl =>
  new DictionaryRepositoryImpl(dataSource);
