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
  const [compareResponse, setCompareResponse] = useState<AiResponse | null>(null);
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

  const {
    mutate: searchCompareWords,
    isPending: isCompareWordsLoading,
    isError: isCompareWordsError,
  } = useMutation({
    mutationFn: (words: string[]) => repository.searchCompareWords(words),
    onSuccess: (data: AiResponse) => {
      setCompareResponse(data);
    },
  });

  const searchWord = (word: string) => {
    if (!word) return;
    setWord(word);
  };

  const resetAiResponse = () => {
    setAiResponse('');
  };

  const resetCompareResponse = () => {
    setCompareResponse(null);
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

  useEffect(() => {
    if (isCompareWordsError) {
      toast({
        title: 'Error comparing words',
        variant: errorToastVariant,
      });
    }
  }, [isCompareWordsError, toast]);

  return {
    searchWord,
    searchAi,
    searchCompareWords,
    resetAiResponse,
    resetCompareResponse,
    searchedWordResult,
    sampleSentences,
    aiResponse,
    compareResponse,
    isSearchWordLoading,
    isSampleSentenceLoading,
    isSearchedWordResultError,
    isSampleSentencesError,
    isAiResponseError,
    isAiResponseLoading,
    isCompareWordsLoading,
    isCompareWordsError,
  };
};

export interface UseDictionaryType {
  searchWord: (word: string) => void;
  searchAi: (word: string) => void;
  searchCompareWords: (words: string[]) => void;
  resetAiResponse: () => void;
  resetCompareResponse: () => void;
  searchedWordResult: SearchResult[];
  sampleSentences: ExampleSentence[];
  aiResponse: string;
  compareResponse: AiResponse | null;
  isSampleSentenceLoading: boolean;
  isSearchWordLoading: boolean;
  isSearchedWordResultError: boolean;
  isSampleSentencesError: boolean;
  isAiResponseError: boolean;
  isAiResponseLoading: boolean;
  isCompareWordsLoading: boolean;
  isCompareWordsError: boolean;
}
