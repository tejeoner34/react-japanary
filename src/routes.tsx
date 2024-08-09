import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import DictionaryScreen from './dictionary/pages/Dictionary';
// import LoginScreen from './auth/pages/LoginScreen';
// import RegisterScreen from './auth/pages/RegisterScreen';
import DecksPage from './flash-cards/pages/Decks.page';
import DictionaryContextProvider from './dictionary/context/dictionaryContext';
import SearchResultsScreen from './dictionary/pages/SearchResultScreen';
import DictionaryModuleLayout from './dictionary/pages/DictionaryModuleLayout';

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
        path: 'decks',
        element: <DecksPage />,
      },
    ],
  },
]);

export default router;
