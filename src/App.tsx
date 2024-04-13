import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Header from './components/ui/Header';
import DictionaryScreen from './pages/Dictionary';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DictionaryScreen />,
  },
  {
    path: '/login',
    element: <LoginScreen />,
  },
  {
    path: '/register',
    element: <RegisterScreen />,
  },
  {
    path: '*',
    element: <div>Not found</div>,
  },
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
