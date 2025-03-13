import { fetchShowDetails } from '@/utils/api';
import Image from 'next/image';

type tParams = Promise<{ id: string }>;

//export default async function ShowPage({ params }: { params: {id: string} }) {
export default async function ShowPage({ params }: { params: tParams }) {
  const { id } = params; 
  const show = await fetchShowDetails(id)

  return (
    <main className='flex flex-col flex-grow'>
      <div className='w-full'>
        <div className='p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6'>
          <Image
            src={`https://image.tmdb.org/t/p/original/${
              show.backdrop_path || show.poster_path
            }`}
            width={500}
            height={300}
            alt='card'
            className='rounded-lg'
            style={{ maxWidth: '100%', height: '100%' }}
          ></Image>
          <div className='p-2'>
            <h2 className='text-lg mb-3 font-bold'>
              {show.title || show.name}
            </h2>
            <p className='text-lg mb-3'>{show.overview}</p>
            <p className='mb-3'>
              <span className='font-semibold mr-1'>Date Released:</span>
              {show.release_date || show.first_air_date}
            </p>
            <p className='mb-3'>
              <span className='font-semibold mr-1'>Rating:</span>
              {show.vote_count}
            </p>
          </div>
        </div>
      </div>
    </main>
  );




  // try & catch 

/*   try {
    const movie = await fetchMovieDetails(movieId);
    
    return (
      <div className='w-full'>
      <div className='p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6'>
        <Image
          src={`https://image.tmdb.org/t/p/original/${
            movie.backdrop_path || movie.poster_path
          }`}
          width={500}
          height={300}
          alt='card'
          className='rounded-lg'
          style={{ maxWidth: '100%', height: '100%' }}
        ></Image>
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
    );
  } catch (error) {
    console.error('Error:', error);
    return <div>Error loading movie</div>;
  } */

}