import { useState, useEffect } from "react";
import { rickandmortyapi } from "../api/api";
import type { Character } from "../types/character";

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
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
        setLoading(true);

        if (!debouncedSearchTerm.trim()) {
          const response = await rickandmortyapi.getCharacters();
          setCharacters(response.results);
        } else {
          const response = await rickandmortyapi.getCharacters(
            1,
            debouncedSearchTerm,
          );
          setCharacters(response.results);
        }
      } catch (error) {
        console.error("Search failed:", error);
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    searchCharacters();
  }, [debouncedSearchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    characters,
    loading,
  };
};
