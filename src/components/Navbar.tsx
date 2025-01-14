import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/movies">Movies</Link>
        </li>
        <li>
          <Link href="/tv-shows">TV Shows</Link>
        </li>
{/*         <li className="relative group">
            <button className="hover:text-gray-300">Browse</button>
            <ul className="absolute hidden group-hover:block bg-gray-700 mt-2 p-2 rounded shadow">
                <li className="p-2 hover:bg-gray-600">
                <Link href="/movies">Movies</Link>
                </li>
                <li className="p-2 hover:bg-gray-600">
                <Link href="/tv-shows">TV Shows</Link>
                </li>
            </ul>
        </li> */}

        <li>
          <Link href="/watchlist">Watchlist</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
