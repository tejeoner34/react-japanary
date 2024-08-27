import { Outlet } from 'react-router-dom';

export default function AuthModuleLayout() {
  return (
    <div className="container grid gap-4 p-5 h-full">
      <Outlet />
    </div>
  );
}
