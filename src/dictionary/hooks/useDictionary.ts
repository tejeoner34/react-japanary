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
  const [meaningWord, setMeaningWord] = useState('');
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
    data: meaningResult = '',
    isLoading: isMeaningLoading,
    isError: isMeaningError,
  } = useQuery({
    queryKey: ['meaningResult', meaningWord],
    queryFn: () => repository.searchMeaningInJapaneseAi(meaningWord),
    enabled: !!meaningWord,
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

  const searchMeaning = (word: string) => {
    if (!word) return;
    setMeaningWord(word);
  };

  const resetMeaning = () => {
    setMeaningWord('');
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

  useEffect(() => {
    if (isMeaningError) {
      toast({
        title: 'Error fetching meaning',
        variant: errorToastVariant,
      });
    }
  }, [isMeaningError, toast]);

  return {
    searchWord,
    searchAi,
    searchCompareWords,
    searchMeaning,
    resetAiResponse,
    resetCompareResponse,
    resetMeaning,
    searchedWordResult,
    sampleSentences,
    meaningResult,
    aiResponse,
    compareResponse,
    isSearchWordLoading,
    isSampleSentenceLoading,
    isMeaningLoading,
    isSearchedWordResultError,
    isSampleSentencesError,
    isMeaningError,
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
  searchMeaning: (word: string) => void;
  resetAiResponse: () => void;
  resetCompareResponse: () => void;
  resetMeaning: () => void;
  searchedWordResult: SearchResult[];
  sampleSentences: ExampleSentence[];
  meaningResult: string;
  aiResponse: string;
  compareResponse: AiResponse | null;
  isSampleSentenceLoading: boolean;
  isSearchWordLoading: boolean;
  isMeaningLoading: boolean;
  isSearchedWordResultError: boolean;
  isSampleSentencesError: boolean;
  isMeaningError: boolean;
  isAiResponseError: boolean;
  isAiResponseLoading: boolean;
  isCompareWordsLoading: boolean;
  isCompareWordsError: boolean;
}
