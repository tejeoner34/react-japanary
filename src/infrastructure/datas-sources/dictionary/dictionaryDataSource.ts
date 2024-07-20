import { ExampleSentence, SearchResult } from '@/models/dictionary/searchResult';

export interface DictionaryDataSource {
  searchWord(word: string): Promise<SearchResult[]>;
  searchSampleSenteces(word: string): Promise<ExampleSentence[]>;
}
