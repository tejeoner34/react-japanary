import { Outlet } from 'react-router-dom';

export default function FlashCardsModuleLayout() {
  return (
    <div className="container grid place-items-center gap-4 p-5 pb-32">
      <Outlet />
    </div>
  );
}
