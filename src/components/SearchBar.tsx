'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const router = useRouter();
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    router.push(`/search/${search}`);
  };
  return (
    <form
      className='flex justify-between px-2 max-w-6xl mx-auto'
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        placeholder='Search...'
        className='w-full h-10 rounded-lg placeholder-gray-500 outline-none bg-transparent flex-1 border pl-1'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button
        className='text-amber-600 disabled:text-gray-400'
        disabled={search === ''}
      >
        Search
      </button>
    </form>
  );
}