import { useState, useEffect } from "react";
import { rickandmortyapi } from "../api/api";
import type { Character } from "../types/character";

export const useSearch = (
  statusFilter: string = "",
  genderFilter: string = "",
) => {
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
    const searchCharacters = async () => {
      try {
        setCharacters([]);
        setPage(1);
        setLoading(true);

        if (!debouncedSearchTerm.trim()) {
          const response = await rickandmortyapi.getCharacters(
            page,
            "",
            statusFilter,
            genderFilter,
          );
          setCharacters(response.results);
          setHasMore(response.info.next !== null);
        } else {
          const response = await rickandmortyapi.getCharacters(
            page,
            debouncedSearchTerm,
            statusFilter,
            genderFilter,
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
  }, [debouncedSearchTerm, statusFilter, genderFilter]);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const response = await rickandmortyapi.getCharacters(
        nextPage,
        debouncedSearchTerm,
        statusFilter,
        genderFilter,
      );

      // Filtriranje id-a
      setCharacters((prev) => {
        const newCharacters = response.results;
        const existingIds = new Set(prev.map((char) => char.id));
        const uniqueNewCharacters = newCharacters.filter(
          (char) => !existingIds.has(char.id),
        );
        return [...prev, ...uniqueNewCharacters];
      });

      setPage(nextPage);
      setHasMore(response.info.next !== null);
    } catch (error) {
      console.error("Load more failed:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    characters,
    loading,
    loadMore,
    hasMore,
    loadingMore,
  };
};
