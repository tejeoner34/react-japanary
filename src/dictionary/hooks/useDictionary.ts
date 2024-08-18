import { useState } from 'react';
import { DictionaryDataSourceImpl } from '../infrastructure/datas-sources/dictionaryDataSourceImpl';
import { ExampleSentence, SearchResult } from '../models/searchResult';
import { DictionaryRepository } from '../repositories/dictionaryRepository';
import { initializeRepository } from '../repositories/dictionaryRespositoryImpl';
const defaultRepository = initializeRepository(new DictionaryDataSourceImpl());

export const useDictionary = (repository: DictionaryRepository = defaultRepository) => {
  const [isSearchWordLoading, setIsSearchWordLoading] = useState(false);
  const [isSampleSentenceLoading, setIsSampleSenteceLoading] = useState(false);
  const [searchedWordResult, setSearchedWordResult] = useState<SearchResult[]>([]);
  const [sampleSentences, setsampleSentences] = useState<ExampleSentence[]>([]);

  const searchSampleSenteces = async (word: string) => {
    setIsSampleSenteceLoading(true);
    const response = await repository.searchSampleSenteces(word);
    setsampleSentences(response);
    setIsSampleSenteceLoading(false);
  };

  const searchMeaning = async (word: string) => {
    setIsSearchWordLoading(true);
    const response = await repository.searchWord(word);
    setSearchedWordResult(response);
    setIsSearchWordLoading(false);
  };

  const searchWord = (word: string) => {
    if (!word) return;
    searchMeaning(word);
    searchSampleSenteces(word);
  };

  return {
    searchWord,
    searchedWordResult,
    sampleSentences,
    isSearchWordLoading,
    isSampleSentenceLoading,
  };
};

export interface UseDictionaryType {
  searchWord: (word: string) => void;
  searchedWordResult: SearchResult[];
  sampleSentences: ExampleSentence[];
  isSearchWordLoading: boolean;
  isSampleSentenceLoading: boolean;
}
