import { createContext, ReactNode } from 'react';
import { useDictionary, UseDictionaryType } from '../hooks/useDictionary';

interface DictionaryProviderProps {
  children: ReactNode;
}
export const DictionaryContext = createContext<UseDictionaryType | null>(null);

export const DictionaryContextProvider: React.FC<DictionaryProviderProps> = ({ children }) => {
  const dictionaryHook = useDictionary();
  return <DictionaryContext.Provider value={dictionaryHook}>{children}</DictionaryContext.Provider>;
};

export default DictionaryContextProvider;
