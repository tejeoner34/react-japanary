import { AuthContextProvider } from '@/auth/context/authContext';
import DictionaryContextProvider from '@/dictionary/context/dictionaryContext';
import { FlashCardsContextProvider } from '@/flash-cards/context/flashCardsContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

const queryClient = new QueryClient();

export const AllProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <FlashCardsContextProvider>
            <DictionaryContextProvider>{children}</DictionaryContextProvider>
          </FlashCardsContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};
