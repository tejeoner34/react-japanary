import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Header from './common/components/ui/Header';
import DictionaryScreen from './dictionary/pages/Dictionary';
import LoginScreen from './auth/pages/LoginScreen';
import RegisterScreen from './auth/pages/RegisterScreen';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DictionaryScreen />,
  },
  // {
  //   path: '/',
  //   element: <LoginScreen />,
  // },
  // {
  //   path: '/register',
  //   element: <RegisterScreen />,
  // },
  // {
  //   path: '*',
  //   element: <div>Not found</div>,
  // },
]);

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
