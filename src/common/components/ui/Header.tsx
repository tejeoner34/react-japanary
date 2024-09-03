import { useAuth } from '@/auth/hooks/useAuth';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const { isUserLogged, signOutUser } = useAuth();
  const location = useLocation();

  const _logOutTpl = () => {
    return (
      isUserLogged && (
        <nav>
          <ul className="flex gap-3 text-primaryText">
            <li onClick={() => signOutUser()}>
              <a className="cursor-pointer opacity-70 hover:opacity-100">Log out</a>
            </li>
          </ul>
        </nav>
      )
    );
  };

  return (
    <div className="bg-backgroundTertiary min-h-20 flex items-center justify-between p-5">
      <nav>
        <ul className="flex gap-3 text-primaryText">
          <li>
            <Link
              to="/decks"
              className={`cursor-pointer opacity-70 hover:opacity-100 p-3 hover:bg-backgroundTertiaryHover rounded ${
                location.pathname === '/decks'
                  ? 'bg-backgroundTertiaryHover rounded opacity-100 p-3'
                  : ''
              }`}
            >
              Decks
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={`cursor-pointer opacity-70 hover:opacity-100 p-3 hover:bg-backgroundTertiaryHover rounded ${
                location.pathname === '/dictionary'
                  ? 'bg-backgroundTertiaryHover rounded opacity-100 p-3'
                  : ''
              }`}
            >
              Dictionary
            </Link>
          </li>
        </ul>
      </nav>

      {_logOutTpl()}
    </div>
  );
}
