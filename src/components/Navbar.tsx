import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="flex space-x-4">
          <Link href="/">Home</Link>
          <Link href="/movies">Movies</Link>
          <Link href="/tv-shows">TV Shows</Link>
          <Link href="/watchlist">Watchlist</Link>
          <Link href="/login">Login</Link>


          
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
