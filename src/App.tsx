import { Outlet } from 'react-router-dom';
import Header from './common/components/ui/Header';

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
