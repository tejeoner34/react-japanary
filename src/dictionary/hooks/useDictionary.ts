import { useQuery } from '@tanstack/react-query';
import { DictionaryDataSourceImpl } from '../infrastructure/datas-sources/dictionaryDataSourceImpl';
import { ExampleSentence, SearchResult } from '../models/searchResult';
import { DictionaryRepository } from '../repositories/dictionaryRepository';
import { initializeRepository } from '../repositories/dictionaryRespositoryImpl';
import { useState } from 'react';

const defaultRepository = initializeRepository(new DictionaryDataSourceImpl());

export const useDictionary = (repository: DictionaryRepository = defaultRepository) => {
  const [word, setWord] = useState('');
  const {
    data: searchedWordResult = [],
    isLoading: isSearchWordLoading,
    isError: isSearchedWordResultError,
  } = useQuery({
    queryKey: ['searchedWordResult', word],
    queryFn: () => repository.searchWord(word),
    enabled: !!word,
    staleTime: 0,
  });

  const {
    data: sampleSentences = [],
    isLoading: isSampleSentenceLoading,
    isError: isSampleSentencesError,
  } = useQuery({
    queryKey: ['sampleSentences', word],
    queryFn: () => repository.searchSampleSenteces(word),
    enabled: !!word,
    staleTime: 0,
  });

  const searchWord = (word: string) => {
    if (!word) return;
    setWord(word);
  };

  return {
    searchWord,
    searchedWordResult,
    sampleSentences,
    isSearchWordLoading,
    isSampleSentenceLoading,
    isSearchedWordResultError,
    isSampleSentencesError,
  };
};

export interface UseDictionaryType {
  searchWord: (word: string) => void;
  searchedWordResult: SearchResult[];
  sampleSentences: ExampleSentence[];
  isSampleSentenceLoading: boolean;
  isSearchWordLoading: boolean;
  isSearchedWordResultError: boolean;
  isSampleSentencesError: boolean;
}
