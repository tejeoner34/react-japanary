import { Outlet } from 'react-router-dom';

export default function DictionaryModuleLayout() {
  return (
    <div className="container grid place-items-center gap-4 p-5">
      <Outlet />
    </div>
  );
}
