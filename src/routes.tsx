import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import DictionaryScreen from './dictionary/pages/Dictionary';
// import LoginScreen from './auth/pages/LoginScreen';
// import RegisterScreen from './auth/pages/RegisterScreen';
import DecksPage from './flash-cards/pages/DecksPage';
import DictionaryContextProvider from './dictionary/context/dictionaryContext';
import SearchResultsScreen from './dictionary/pages/SearchResultScreen';
import DictionaryModuleLayout from './dictionary/layout/DictionaryModuleLayout';
import FlashCardsModuleLayout from './flash-cards/layout/FlashCardsModuleLayout';
import { FlashCardsContextProvider } from './flash-cards/context/flashCardsContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
        element: (
          <FlashCardsContextProvider>
            <FlashCardsModuleLayout />
          </FlashCardsContextProvider>
        ),
        children: [
          {
            path: '/decks',
            element: <DecksPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
