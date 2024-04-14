import { DictionaryDataSourceImpl } from '@/infrastructure/datas-sources/dictionary/dictionaryDataSourceImpl';
import { SearchResult } from '@/models/dictionary/searchResult';
import { initializeRepository } from '@/repositories/dictionary/dictionaryRespositoryImpl';
import { useState } from 'react';

const repository = initializeRepository(new DictionaryDataSourceImpl());

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
