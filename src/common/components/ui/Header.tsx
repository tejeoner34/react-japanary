import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="bg-backgroundTertiary min-h-20 flex items-center justify-between p-5">
      <nav>
        <ul className="flex gap-3 text-primaryText">
          <li>
            <Link
              to="/decks"
              className="cursor-pointer opacity-70 hover:opacity-100 p-3 hover:bg-backgroundTertiaryHover rounded"
            >
              Decks
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="cursor-pointer opacity-70 hover:opacity-100 p-3 hover:bg-backgroundTertiaryHover rounded"
            >
              Dictionary
            </Link>
          </li>
        </ul>
      </nav>
      {/* this must render only when user is logged */}
      {/* <nav>
        <ul className="flex gap-3 text-primaryText">
          <li>
            <a className="cursor-pointer opacity-70 hover:opacity-100">Log out</a>
          </li>
        </ul>
      </nav> */}
    </div>
  );
}
