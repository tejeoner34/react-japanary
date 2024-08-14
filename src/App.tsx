import { Outlet } from 'react-router-dom';
import Header from './common/components/ui/Header';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
