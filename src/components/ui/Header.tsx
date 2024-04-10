export default function Header() {
  return (
    <div className="bg-primary-100 min-h-20 flex items-center justify-between p-5">
      <nav>
        <ul className="flex gap-3 text-primaryText">
          <li>
            <a className="cursor-pointer opacity-70 hover:opacity-100">Decks</a>
          </li>
          <li>
            <a className="cursor-pointer opacity-70 hover:opacity-100">Dictionary</a>
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
