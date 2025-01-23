'use client';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { SearchBar } from './SearchBar';
import { createClient } from '@/utils/supabase/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRightToBracket,
  faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user); // Set initial user
    };

    fetchUser();

    // Listen for auth state changes
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null); // Update user on auth changes
    });

    return () => subscription.unsubscribe(); // Cleanup listener
  }, []);

  // Toggle mobile menu
  const handleNav = () => {
    setNav(!nav);
  };

  // Sign out function
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null); // Reset user state
    setNav(false); // Close mobile menu
  };

  // Nav items
  const navItems = [
    { id: 1, text: 'Home', href: '/' },
    { id: 2, text: 'Movies', href: '/movies' },
    { id: 3, text: 'Shows', href: '/shows' },
  ];

  return (
    <div className="bg-black flex justify-between items-center h-24 mx-auto px-4 text-white">
      <h1 className="w-full text-3xl font-bold text-[#00df9a]">REACT.</h1>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center">
        {navItems.map((item) => (
          <li key={item.id} className="w-full min-w-[100px]">
            <Link
              href={item.href}
              className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black whitespace-nowrap"
            >
              {item.text}
            </Link>
          </li>
        ))}
        {user ? (
          <button
            onClick={handleSignOut}
            className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black flex items-center gap-2 w-full min-w-[120px]"
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        ) : (
          <Link
            href="/auth/sign-in"
            className="p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faArrowRightToBracket} className="w-4 h-4" />
            <span>Sign In</span>
          </Link>
        )}
      </ul>
      <SearchBar />

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
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
        <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">REACT.</h1>
        {navItems.map((item) => (
          <li key={item.id} className="p-4 border-b border-gray-600">
            <Link
              href={item.href}
              className="rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black"
              onClick={() => setNav(false)}
            >
              {item.text}
            </Link>
          </li>
        ))}
        {user ? (
          <li className="p-4 border-b border-gray-600">
            <button
              onClick={handleSignOut}
              className="rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </li>
        ) : (
          <li className="p-4 border-b border-gray-600">
            <Link
              href="/auth/sign-in"
              className="rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faArrowRightToBracket} className="w-4 h-4" />
              <span>Sign In</span>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
