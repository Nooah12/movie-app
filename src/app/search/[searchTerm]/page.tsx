/* import Results from "@/components/Results";

import { fetchSearchResults } from "@/utils/api";

export default async function SearchPage({params}: { params: {searchTerm: string} }) {
    const searchTerm = params.searchTerm;
    const search = await fetchSearchResults(searchTerm);

  return (
    <div>
      {search.results && search.results.length ===
        <h1 className='text-center pt-6'>No results found</h1>}
      {search.results && <Results results={search.results} />}
    </div>
  )
} */

  // dont even need this I think