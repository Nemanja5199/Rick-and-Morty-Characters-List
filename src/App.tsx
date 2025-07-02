import { useState } from "react";
import { useSearch } from "./hooks/useSearch";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import { CharacterCard } from "./components/Character";
import { FilterModal } from "./components/FilterModal/FilterModal";

function App() {

    const [appliedStatus, setAppliedStatus] = useState("");
    const [appliedGender, setAppliedGender] = useState("");

  const { searchTerm, setSearchTerm, characters, loading, loadMore, hasMore, loadingMore } = useSearch(appliedStatus,appliedGender);
  

  const [showFilterModal, setShowFilterModal] = useState(false);
  

  const [tempSelectedStatus, setTempSelectedStatus] = useState("");
  const [tempSelectedGender, setTempSelectedGender] = useState("");
  



  useInfiniteScroll(() => {
    if (hasMore && !loading && !loadingMore) {
      loadMore();
    }
  });

  const handleApplyFilters = () => {
    setAppliedStatus(tempSelectedStatus);
    setAppliedGender(tempSelectedGender);
    setShowFilterModal(false);
  };

  const handleClearFilters = () => {
    setTempSelectedStatus("");
    setTempSelectedGender("");
    setAppliedStatus("");
    setAppliedGender("");
    setShowFilterModal(false);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (appliedStatus) count++;
    if (appliedGender) count++;
    return count;
  };

  return (
    <div className="p-8">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4 text-center lg:text-left">
        <h1 className="text-3xl font-bold">Rick and Morty Characters</h1>

        <div className="flex justify-center lg:justify-end gap-4 items-center">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
          />
          
          <button
            onClick={() => setShowFilterModal(true)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            Filters
            {getActiveFilterCount() > 0 && (
              <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                {getActiveFilterCount()}
              </span>
            )}
          </button>
        </div>
      </div>

      {loading && <div className="text-center">Loading characters...</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      {loadingMore && (
        <div className="text-center mt-4">Loading more characters...</div>
      )}

      {characters.length === 0 && !loading && (
        <div className="text-center text-gray-500 mt-8">
          No characters found. Try a different search term or filter.
        </div>
      )}

      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        selectedStatus={tempSelectedStatus}
        selectedGender={tempSelectedGender}
        onStatusChange={setTempSelectedStatus}
        onGenderChange={setTempSelectedGender}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />
    </div>
  );
}

export default App;