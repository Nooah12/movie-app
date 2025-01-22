import { Type } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';
import { FiThumbsUp } from 'react-icons/fi';

export default function Card({ result }: {result: Type}) {
  return (
    <div className='cursor-pointer mb-4'>
      <Link href={
        result.media_type === 'tv' ? 
        `/shows/${result.id}` :
        `/movies/${result.id}`}>
        <div className='group hover:shadow-slate-400 shadow-md rounded-md border-slate-400 m-2 transition-shadow duration-200'>
          <div className='aspect-[2/3] relative'>
            <Image
              src={`https://image.tmdb.org/t/p/original/${
                result.poster_path || result.backdrop_path
              }`}
              alt='card'
              fill
              className='rounded-md w-full h-auto object-cover group-hover:opacity-75 transition-opacity duration-300'
            ></Image>
          </div>
        </div>
        <div className='min-w-0 p-2'>
          <h2 className='text-sm font-medium truncate mb-2'>
            {result.title || result.name}
          </h2>
          <p className='flex items-center text-xs text-gray-400 !font-extralight'>
            {(result.release_date || result.first_air_date).slice(0,4)}
            <FiThumbsUp className='h-5 mr-1 ml-auto' />
            {result.vote_count}
          </p>
        </div>
      </Link>
    </div>
  );
}