import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import DictionaryScreen from './dictionary/pages/Dictionary';
// import LoginScreen from './auth/pages/LoginScreen';
// import RegisterScreen from './auth/pages/RegisterScreen';
import DecksPage from './flash-cards/pages/Decks.page';
import DictionaryContextProvider from './dictionary/context/dictionaryContext';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <DictionaryContextProvider>
            <DictionaryScreen />
          </DictionaryContextProvider>
        ),
      },
      {
        path: 'decks',
        element: <DecksPage />,
      },
    ],
  },
]);

export default router;
