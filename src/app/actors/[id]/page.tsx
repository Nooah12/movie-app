import { fetchActorDetails } from '@/utils/api';
import Image from 'next/image';
import { Actor } from '@/utils/types';

interface ActorPageProps {
  params: {
    id: string;
  };
}

 //export default async function ActorPage({ params }: { params: {id: string} }) { 

export default async function ActorPage({ params }: ActorPageProps) {
  const { id } = params;
  const actor: Actor = await fetchActorDetails(id);

  if (!actor) {
    return <div>Actor not found</div>;
  }

  return (
    <main className='flex flex-col flex-grow'>
      <div className='w-full'>
        <div className='p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6'>
          <Image
            src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`}
            width={300}
            height={300}
            alt={actor.name}
            className='rounded-lg'
            style={{ maxWidth: '100%', height: '100%' }}
            priority
          />
          <div className='p-2'>
            <h2 className='text-lg mb-3 font-bold'>{actor.name}</h2>
            <p className='text-xs md:text-sm mb-3'>{actor.biography}</p>
            <p className='text-xs md:text-sm mb-3'>
              <span className='font-bold mr-1'>Born:</span>
              {actor.birthday}
            </p>
            <p className='text-xs md:text-sm mb-3'>
              <span className='font-bold mr-1'>Known For:</span>
              {actor.known_for_department}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}






