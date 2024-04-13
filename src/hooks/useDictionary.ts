import { DictionaryDSMockImpl } from '@/infrastructure/datas-sources/dictionary/dictionaryDSMockImpl';
import { SearchResult } from '@/models/dictionary/searchResult';
import { initializeRepository } from '@/repositories/dictionary/dictionaryRespositoryImpl';
import { useState } from 'react';

const repository = initializeRepository(new DictionaryDSMockImpl());

export const useDictionary = () => {
  const [searchedWordResult, setSearchedWordResult] = useState<SearchResult[]>([]);

  const searchWord = async (word: string) => {
    const response = await repository.searchWord(word);
    setSearchedWordResult(response);
  };
  return {
    searchWord,
    searchedWordResult,
  };
};
