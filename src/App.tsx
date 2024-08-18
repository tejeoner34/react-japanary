import { Outlet } from 'react-router-dom';
import Header from './common/components/ui/Header';
import { Toaster } from './common/components/ui';

function App() {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex-1">
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
}

export default App;
