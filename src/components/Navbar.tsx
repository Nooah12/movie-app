/* 'use client'

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
        </li> 



      </div>
    </nav>
  );
};

export default Navbar;
 */







'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { SearchBar } from './SearchBar';
import { usePathname } from 'next/navigation';

interface NavProps {
  id: number;
  text: string;
  href: string;
}

const Navbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);
  const pathname = usePathname();
  
  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems: NavProps[] = [
    { id: 1, text: 'Home',  href: '/' },
    { id: 2, text: 'Movies', href: '/movies' },
    { id: 3, text: 'Shows', href: '/shows' },
    { id: 4, text: 'Sign In', href: '/auth/sign-in' },
  ];

  return (
    <div className='bg-black flex justify-between items-center h-24 mx-auto px-4 text-white'>
      <h1 className='w-full text-3xl font-bold text-[#00df9a]'>REACT.</h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems.map(item => (
          <li key={item.id} className='w-full min-w-[100px]'>
            <Link 
              href={item.href}
              className={`p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black whitespace-nowrap
                ${pathname === item.href ? 'bg-[#00df9a] text-black' : ''}`}
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
      <SearchBar />

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>REACT.</h1>

        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 border-b border-gray-600'
          >
            <Link 
              href={item.href}
              className={`rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black
                ${pathname === item.href ? 'text-[#00df9a]' : ''}`}
              onClick={() => setNav(false)} // Close mobile menu when item is clicked
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;