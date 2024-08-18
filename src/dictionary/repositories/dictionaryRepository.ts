import { ExampleSentence, SearchResult } from '@/dictionary/models/searchResult';

export interface DictionaryRepository {
  searchWord(word: string): Promise<SearchResult[]>;
  searchSampleSenteces(word: string): Promise<ExampleSentence[]>;
}
