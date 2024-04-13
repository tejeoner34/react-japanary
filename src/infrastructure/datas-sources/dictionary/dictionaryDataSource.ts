import { SearchResult } from '@/models/dictionary/searchResult';

export interface DictionaryDataSource {
  searchWord(word: string): Promise<SearchResult[]>;
}
