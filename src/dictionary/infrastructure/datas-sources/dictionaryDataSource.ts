import { AiResponse, ExampleSentence, SearchResult } from '@/dictionary/models/searchResult';

export interface DictionaryDataSource {
  searchWord(word: string): Promise<SearchResult[]>;
  searchSampleSenteces(word: string): Promise<ExampleSentence[]>;
  searchAi(word: string): Promise<AiResponse>;
}
