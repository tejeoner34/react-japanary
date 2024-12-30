import { useMutation, useQuery } from '@tanstack/react-query';
import { DictionaryDataSourceImpl } from '../infrastructure/datas-sources/dictionaryDataSourceImpl';
import { AiResponse, ExampleSentence, SearchResult } from '../models/searchResult';
import { DictionaryRepository } from '../repositories/dictionaryRepository';
import { initializeRepository } from '../repositories/dictionaryRespositoryImpl';
import { useState } from 'react';

const defaultRepository = initializeRepository(new DictionaryDataSourceImpl());

export const useDictionary = (repository: DictionaryRepository = defaultRepository) => {
  const [word, setWord] = useState('');
  const [aiResponse, setAiResponse] = useState('');

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

  const {
    mutate: searchAi,
    isPending: isAiResponseLoading,
    isError: isAiResponseError,
  } = useMutation({
    mutationFn: (word: string) => repository.searchAi(word),
    onSuccess: (data: AiResponse) => {
      setAiResponse(data);
    },
  });

  const searchWord = (word: string) => {
    if (!word) return;
    setWord(word);
  };

  const resetAiResponse = () => {
    setAiResponse('');
  };

  return {
    searchWord,
    searchAi,
    resetAiResponse,
    searchedWordResult,
    sampleSentences,
    aiResponse,
    isSearchWordLoading,
    isSampleSentenceLoading,
    isSearchedWordResultError,
    isSampleSentencesError,
    isAiResponseError,
    isAiResponseLoading,
  };
};

export interface UseDictionaryType {
  searchWord: (word: string) => void;
  searchAi: (word: string) => void;
  resetAiResponse: () => void;
  searchedWordResult: SearchResult[];
  sampleSentences: ExampleSentence[];
  aiResponse: string;
  isSampleSentenceLoading: boolean;
  isSearchWordLoading: boolean;
  isSearchedWordResultError: boolean;
  isSampleSentencesError: boolean;
  isAiResponseError: boolean;
  isAiResponseLoading: boolean;
}
