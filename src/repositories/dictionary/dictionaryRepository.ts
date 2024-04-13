import { SearchResult } from '@/models/dictionary/searchResult';

export interface DictionaryRepository {
  searchWord(word: string): Promise<SearchResult[]>;
}
