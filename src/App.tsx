import { useState } from "react";
import { useSearch } from "./hooks/useSearch";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";
import { CharacterCard } from "./components/Character";
import { FilterModal } from "./components/FilterModal/FilterModal";

function App() {
  const [appliedStatus, setAppliedStatus] = useState("");
  const [appliedGender, setAppliedGender] = useState("");

  const {
    searchTerm,
    setSearchTerm,
    characters,
    loading,
    loadMore,
    hasMore,
    loadingMore,
  } = useSearch(appliedStatus, appliedGender);

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
    <div
      className="min-h-screen p-8"
      style={{ backgroundColor: "rgb(45, 52, 64)" }}
    >
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 gap-6 text-center lg:text-left">
        <div>
          <h1
            className="text-4xl font-bold text-white mb-2"
            style={{ fontFamily: "RickAndMorty, sans-serif" }}
          >
            Rick and Morty
          </h1>
          <p
            className="text-gray-300"
            style={{ fontFamily: "RickAndMorty, sans-serif" }}
          >
            Character Explorer
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center lg:justify-end gap-4 items-center">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search characters..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-white placeholder-gray-400"
              style={{
                backgroundColor: "rgb(60, 68, 82)",
                border: "1px solid rgb(75, 85, 99)",
              }}
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilterModal(true)}
            className="px-6 py-3 rounded-xl hover:opacity-80 transition-all duration-200 flex items-center gap-2 text-white"
            style={{
              backgroundColor: "rgb(60, 68, 82)",
              border: "1px solid rgb(75, 85, 99)",
            }}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z"
              />
            </svg>
            Filters
            {getActiveFilterCount() > 0 && (
              <span className="bg-emerald-500 text-white text-xs rounded-full px-2 py-1 animate-pulse">
                {getActiveFilterCount()}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-gray-300 text-lg">Loading characters...</p>
        </div>
      )}

      {/* Character Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      {/* Load More State */}
      {loadingMore && (
        <div className="flex justify-center py-8">
          <div className="flex items-center gap-2 text-blue-400">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
            <span>Loading more...</span>
          </div>
        </div>
      )}

      {/* No Results */}
      {characters.length === 0 && !loading && (
        <div className="text-center text-gray-400 mt-8">
          <p className="text-lg">No characters found.</p>
          <p className="text-sm">Try a different search term or filter.</p>
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
