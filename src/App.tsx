import { useSearch } from "./hooks/useSearch";
import { CharacterCard } from "./components/Character";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";

function App() {
  const {
    searchTerm,
    setSearchTerm,
    characters,
    loading,
    loadMore,
    hasMore,
    loadingMore,
  } = useSearch();

  useInfiniteScroll(() => {
    if (hasMore && !loading && !loadingMore) {
      loadMore();
    }
  });

  return (
    <div className="p-8">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4 text-center lg:text-left">
        <h1 className="text-3xl font-bold">Rick and Morty Characters</h1>

        <div className="flex justify-center lg:justify-end">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
        </div>
      </div>

      {loading && <div className="text-center">Loading characters...</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      {characters.length === 0 && !loading && (
        <div className="text-center text-gray-500 mt-8">
          No characters found. Try a different search term.
        </div>
      )}
    </div>
  );
}

export default App;
