import { Type } from '@/utils/types';
import Image from 'next/image';
import Link from 'next/link';
import { FiThumbsUp } from 'react-icons/fi';

export default function Card({ result }: {result: Type}) {
  return (
    <div className='group cursor-pointer sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border-slate-400 sm:m-2 transition-shadow duration-200'>
      <Link href={
        result.media_type === 'tv' ? 
        `/shows/${result.id}` :
        `/movies/${result.id}`}>
        <Image
          src={`https://image.tmdb.org/t/p/original/${
            result.poster_path || result.backdrop_path
          }`}
          alt='card'
          width={350}
          height={400}
          className='rounded-md group-hover:opacity-75 transition-opacity duration-300'
        ></Image>
        <div className='p-2 min-w-0'>
          <h2 className='text-sm font-medium truncate'>
            {result.title || result.name}
          </h2>
          <p className='flex items-center text-sm'>
            {/* {result.release_date.slice(0,4) || result.first_air_date.slice(0,4)} */}
            {(result.release_date || result.first_air_date).slice(0,4)}
            <FiThumbsUp className='h-5 mr-1 ml-auto' />
            {result.vote_count}
          </p>
        </div>
      </Link>
    </div>
  );
}