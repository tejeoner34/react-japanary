import { useContext } from 'react';
import { DictionaryContext } from '../context/dictionaryContext';
import { UseDictionaryType } from './useDictionary';

export const useDictionaryContext = (): UseDictionaryType => {
  const context = useContext(DictionaryContext);
  if (!context) {
    throw new Error('useDictionaryContext must be used within a DictionaryProvider');
  }
  return context;
};
