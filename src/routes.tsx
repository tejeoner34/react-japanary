import { createBrowserRouter, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import DictionaryContextProvider from './dictionary/context/dictionaryContext';
import { AuthContextProvider } from './auth/context/authContext';
import { FlashCardsContextProvider } from './flash-cards/context/flashCardsContext';
import AuthModuleLayout from './auth/layout/AuthModuleLayout';
import FlashCardsModuleLayout from './flash-cards/layout/FlashCardsModuleLayout';
import DictionaryModuleLayout from './dictionary/layout/DictionaryModuleLayout';
import DecksPage from './flash-cards/pages/DecksPage';
import DictionaryScreen from './dictionary/pages/Dictionary';
import LoginScreen from './auth/pages/LoginScreen';
import RegisterScreen from './auth/pages/RegisterScreen';
import SearchResultsScreen from './dictionary/pages/SearchResultScreen';
import StudyPage from './flash-cards/pages/StudyPage';

const queryClient = new QueryClient();

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <QueryClientProvider client={queryClient}>
          <FlashCardsContextProvider>
            <App />
          </FlashCardsContextProvider>
        </QueryClientProvider>
      ),
      children: [
        {
          path: '/',
          element: (
            <DictionaryContextProvider>
              <DictionaryModuleLayout />
            </DictionaryContextProvider>
          ),
          children: [
            {
              path: '/',
              element: <Navigate to="/dictionary" />,
            },
            {
              path: '/dictionary',
              element: <DictionaryScreen />,
            },
            {
              path: 'dictionary/search/:query',
              element: <SearchResultsScreen />,
            },
          ],
        },
        {
          path: '/',
          element: <FlashCardsModuleLayout />,
          children: [
            {
              path: '/decks',
              element: <DecksPage />,
            },
            {
              path: '/decks/study/:deckId',
              element: <StudyPage />,
            },
          ],
        },
        {
          path: '/auth',
          element: (
            <AuthContextProvider>
              <AuthModuleLayout />
            </AuthContextProvider>
          ),
          children: [
            {
              path: '/auth/login',
              element: <LoginScreen />,
            },
            {
              path: '/auth/register',
              element: <RegisterScreen />,
            },
          ],
        },
      ],
    },
  ],
  { basename: import.meta.env.DEV ? '/' : '/react-japanary/' }
);

export default router;
