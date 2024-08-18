import DictionaryContextProvider from '@/dictionary/context/dictionaryContext';
import { MemoryRouter } from 'react-router-dom';

export const AllProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MemoryRouter>
      <DictionaryContextProvider>{children}</DictionaryContextProvider>
    </MemoryRouter>
  );
};
