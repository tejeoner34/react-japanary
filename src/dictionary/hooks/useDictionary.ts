import { DictionaryDataSourceImpl } from '@/infrastructure/datas-sources/dictionary/dictionaryDataSourceImpl';
import { ExampleSentence, SearchResult } from '@/models/dictionary/searchResult';
import { initializeRepository } from '@/repositories/dictionary/dictionaryRespositoryImpl';
import { useState } from 'react';
import { set } from 'react-hook-form';

const repository = initializeRepository(new DictionaryDataSourceImpl());

export const useDictionary = () => {
  const [searchedWordResult, setSearchedWordResult] = useState<SearchResult[]>([]);
  const [sampleSentences, setsampleSentences] = useState<ExampleSentence[]>([]);

  const searchSampleSenteces = async (word: string) => {
    const response = await repository.searchSampleSenteces(word);
    setsampleSentences(response);
  };

  const searchWord = async (word: string) => {
    const response = await repository.searchWord(word);
    setSearchedWordResult(response);
  };
  return {
    searchWord,
    searchSampleSenteces,
    searchedWordResult,
    sampleSentences,
  };
};
