import Results from "@/components/results";

import { fetchMovies } from "@/utils/api";

export default async function SearchPage({params}: { params: {searchTerm: string} }) {
    const searchTerm = params.searchTerm;
    const movies = await fetchMovies(searchTerm);

  return (
    <div>
      {movies.results && movies.results.length ===
        <h1 className='text-center pt-6'>No results found</h1>}
      {movies.results && <Results results={movies.results} />}
    </div>
  )
}
