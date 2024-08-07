import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import DictionaryScreen from './dictionary/pages/Dictionary';
// import LoginScreen from './auth/pages/LoginScreen';
// import RegisterScreen from './auth/pages/RegisterScreen';
import DecksPage from './flash-cards/pages/Decks.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <DictionaryScreen />,
      },
      {
        path: 'decks',
        element: <DecksPage />,
      },
    ],
  },
]);

export default router;
