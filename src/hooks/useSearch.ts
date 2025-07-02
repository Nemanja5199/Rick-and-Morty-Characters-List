import { useState, useEffect } from "react";
import { rickandmortyapi } from "../api/api";
import type { Character } from "../types/character";

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);

  // Dodat debounce da se ne spamuje api na svaku promenu u search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);


  useEffect(() => {
  setCharacters([]);
  setPage(1);
}, [debouncedSearchTerm]);

  useEffect(() => {
    const searchCharacters = async () => {
      try {
        setLoading(true);
    
        if (!debouncedSearchTerm.trim()) {
          const response = await rickandmortyapi.getCharacters(1);
          setCharacters(response.results);
          setHasMore(response.info.next !== null);
        } else {
          const response = await rickandmortyapi.getCharacters(
            1,
            debouncedSearchTerm,
          );
          setCharacters(response.results);
          setHasMore(response.info.next !== null);
        }
      } catch (error) {
        console.error("Search failed:", error);
        setCharacters([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    };

    searchCharacters();
  }, [debouncedSearchTerm]);


  const loadMore = async () => {
  if(loadingMore || !hasMore) return;

  try {
    setLoadingMore(true);
    const nextPage = page + 1;
    const response = await rickandmortyapi.getCharacters(nextPage, debouncedSearchTerm);

    // Filtriranje id-a 
    setCharacters(prev => {
      const newCharacters = response.results;
      const existingIds = new Set(prev.map(char => char.id));
      const uniqueNewCharacters = newCharacters.filter(char => !existingIds.has(char.id));
      return [...prev, ...uniqueNewCharacters];
    });
    
    setPage(nextPage);
    setHasMore(response.info.next !== null);

  } catch (error) {
    console.error("Load more failed:", error);
  } finally {
    setLoadingMore(false);
  }
}


  return {
    searchTerm,
    setSearchTerm,
    characters,
    loading,
    loadMore,
    hasMore,
    loadingMore
  };
};
