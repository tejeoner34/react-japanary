import { useMutation, useQuery } from '@tanstack/react-query';
import { DictionaryDataSourceImpl } from '../infrastructure/datas-sources/dictionaryDataSourceImpl';
import { AiResponse, ExampleSentence, SearchResult } from '../models/searchResult';
import { DictionaryRepository } from '../repositories/dictionaryRepository';
import { initializeRepository } from '../repositories/dictionaryRespositoryImpl';
import { useEffect, useState } from 'react';
import { useToast } from '@/common/components/ui';

const defaultRepository = initializeRepository(new DictionaryDataSourceImpl());
const retry = 2;
const errorToastVariant = 'destructive';

export const useDictionary = (repository: DictionaryRepository = defaultRepository) => {
  const [word, setWord] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const { toast } = useToast();
  const config = {
    enabled: !!word,
    staleTime: 0,
    retry,
  };

  const {
    data: searchedWordResult = [],
    isLoading: isSearchWordLoading,
    isError: isSearchedWordResultError,
  } = useQuery({
    queryKey: ['searchedWordResult', word],
    queryFn: () => repository.searchWord(word),
    ...config,
  });

  const {
    data: sampleSentences = [],
    isLoading: isSampleSentenceLoading,
    isError: isSampleSentencesError,
  } = useQuery({
    queryKey: ['sampleSentences', word],
    queryFn: () => repository.searchSampleSenteces(word),
    ...config,
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

  useEffect(() => {
    if (isSearchedWordResultError) {
      toast({
        title: 'Error fetching search results',
        variant: errorToastVariant,
      });
    }
  }, [isSearchedWordResultError, toast]);

  useEffect(() => {
    if (isAiResponseError) {
      toast({
        title: 'Error fetching AI response',
        variant: errorToastVariant,
      });
    }
  }, [isAiResponseError, toast]);

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
