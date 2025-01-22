import { Type } from '@/utils/types';
import Card from './Card';

export default function Results({ results }: { results: Type }) {
  return (
    <section className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 max-w-6xl mx-auto p-4'>
      {results.map((result: Type) => (
        <Card key={result.id} result={result} />
      ))}
    </section>
  );
}