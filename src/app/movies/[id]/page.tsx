import { fetchMovieDetails } from '@/utils/api';
import Image from 'next/image';

type tParams = Promise<{ id: string }>;

export default async function MoviePage({ params }: { params: tParams }) {
  try {
    const { id } = await params;
    const movie = await fetchMovieDetails(id);

    return (
      <main className='flex flex-col flex-grow'>
        <div className='w-full'>
          <div className='p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6'>
            <Image
              src={`https://image.tmdb.org/t/p/original/${
                movie.backdrop_path || movie.poster_path
              }`}
              width={500}
              height={300}
              alt='Movie poster'
              className='rounded-lg'
              style={{ maxWidth: '100%', height: '100%' }}
            />
            <div className='p-2'>
              <h2 className='text-lg mb-3 font-bold'>
                {movie.title || movie.name}
              </h2>
              <p className='text-lg mb-3'>{movie.overview}</p>
              <p className='mb-3'>
                <span className='font-semibold mr-1'>Date Released:</span>
                {movie.release_date || movie.first_air_date}
              </p>
              <p className='mb-3'>
                <span className='font-semibold mr-1'>Rating:</span>
                {movie.vote_count}
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading movie details:', error);
    return (
      <main className='flex flex-col flex-grow items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-4'>Error</h1>
          <p>Sorry, there was an error loading the movie details.</p>
        </div>
      </main>
    );
  }
}
