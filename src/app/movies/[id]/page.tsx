import { fetchMovieCredits, fetchMovieDetails } from '@/utils/api';
import Image from 'next/image';
import { Type, CrewMember } from '@/utils/types';
import { AiFillStar } from 'react-icons/ai';

type tParams = Promise<{ id: string }>;

export default async function MoviePage({ params }: { params: tParams }) {
  try {
    const { id } = await params;
    const movie: Type = await fetchMovieDetails(id);
    const credits = await fetchMovieCredits(id)
    
    // Extract directors and writers from crew
    const directors = credits.crew?.filter((person: CrewMember) => person.job === "Director").map((person: CrewMember) => person.name);
    const writers = credits.crew?.filter((person: CrewMember) => person.department === "Writing").map((person: CrewMember) => person.name);

    return (
      <section className='flex flex-col flex-grow'>
          <div className='p-4 md:pt-8 flex flex-col xl:flex-row max-w-6xl mx-auto'>
              <h2 className='text-3xl md:text-4xl mb-1 font-medium'>
                {movie.title || movie.name}
              </h2>
              <div className='flex flex-row text-sm text-gray-400 mb-3'>
                <span>{movie.release_date.slice(0,4)}</span>
                <span className="mx-2">•</span>
                {/* <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span> */}
                <span>{movie.runtime} min</span>
              </div>
            {/* --------- IMG ----------- */}
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <Image
                src={`https://image.tmdb.org/t/p/original/${
                  movie.backdrop_path || movie.poster_path
                }`}
                alt='Movie poster'
                fill
                className='object-cover'
                priority
              />
            </div>
            {/* --------- Details ----------- */}
            <div className=''>
              <p className='text-sm md:text-base my-4'>{movie.overview}</p>
              <div className='space-y-2 text-sm md:text-base'>
                <div className='flex'>
                  {/* <span className='font-semibold text-gray-400 w-32'>Rating:</span> */}
                  <span className='flex items-center mb-2'><AiFillStar size={16} className='text-yellow-400' />{movie.vote_average?.toFixed(1)}/10 <span className='text-gray-400 ml-1'>({movie.vote_count} votes)</span></span>
                </div>
                <div className='flex'>
                  <span className='font-semibold text-gray-400 w-32'>Genre:</span>
                  <span>{movie.genres?.map((genre) => genre.name).join(', ')}</span>
                </div>
                <div className='flex'>
                  <span className='font-semibold text-gray-400 w-32'>Director:</span>
                  <span className='flex-1'>
                    {directors?.join(', ') || 'N/A'}
                  </span>
                </div>
                <div className='flex'>
                  <span className='font-semibold text-gray-400 w-32'>Writers:</span>
                  <span className='flex-1'>
                    {writers?.join(', ') || 'N/A'}
                  </span>
                </div>
                <div className='flex'>
                  <span className='font-semibold text-gray-400 w-32'>Actors:</span>
                  <span className='flex-1'>
                    {credits.cast?.slice(0, 4).map((actor: { name: string; }) => actor.name).join(', ')}
                  </span>
                </div>
                <div className='flex'>
                  <span className='font-semibold text-gray-400 w-32'>Release date:</span>
                  <span>{movie.release_date || movie.first_air_date}</span>
                </div>
              </div>
            </div>
          </div>
      </section>
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
