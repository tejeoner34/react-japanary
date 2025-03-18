import { createBrowserRouter, Navigate } from 'react-router-dom';
import { queryClient, QueryClientProvider } from './common/config/react-query';
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
import ProtectedRoute from './auth/components/ProtectedRoute';
import IsLoggedGuard from './auth/components/IsLoggedGuard';
import SeeFlashcardsPage from './flash-cards/pages/SeeFlashcardsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <DictionaryContextProvider>
            <FlashCardsContextProvider>
              <App />
            </FlashCardsContextProvider>
          </DictionaryContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    ),
    children: [
      {
        path: '/',
        element: <DictionaryModuleLayout />,
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
            element: <ProtectedRoute />,
            children: [{ path: '', element: <DecksPage /> }],
          },
          {
            path: '/decks/study/:deckId',
            element: <ProtectedRoute />,
            children: [{ path: '', element: <StudyPage /> }],
          },
          {
            path: '/decks/cards/:deckId',
            element: <ProtectedRoute />,
            children: [{ path: '', element: <SeeFlashcardsPage /> }],
          },
        ],
      },
      {
        path: '/auth',
        element: <AuthModuleLayout />,
        children: [
          {
            path: '/auth/login',
            element: <IsLoggedGuard redirectTo="/" />,
            children: [{ path: '', element: <LoginScreen /> }],
          },
          {
            path: '/auth/register',
            element: <IsLoggedGuard redirectTo="/" />,
            children: [{ path: '', element: <RegisterScreen /> }],
          },
        ],
      },
      {
        path: '*',
        element: <Navigate to="/dictionary" />,
      },
    ],
  },
]);

export default router;
