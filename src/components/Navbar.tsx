'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SearchBar } from './SearchBar';

const Navbar = () => {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return (
    <nav  className={`${
      isHomepage
        ? "absolute top-0 left-0 w-full z-10 text-white bg-gray-600 p-4 backdrop-blur-sm backdrop-filter-none"
        : "sticky top-0 left-0 w-full z-10 bg-white shadow-md text-gray-900 p-4"
    }`}>
      <div className="flex items-center">
          <div>
            <Link href="/">Logo</Link>
          </div>
          <div>
            <Link href="/movies">Movies</Link>
            <Link href="/tv-shows">TV Shows</Link>
          </div>
          <SearchBar />
          <div>
            <Link href="/watchlist">Watchlist</Link>
            <Link href="/login">Login</Link>
          </div>



          
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



      </div>
    </nav>
  );
};

export default Navbar;
