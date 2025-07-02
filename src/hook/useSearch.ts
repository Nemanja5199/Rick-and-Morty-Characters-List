import { useState, useEffect } from "react";

import { rickandmortyapi } from "../api/api";

import type { Character } from "../types/character";

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchCharacters = async () => {
      try {
        setLoading(true);

        if (!searchTerm.trim()) {
          const response = await rickandmortyapi.getCharacters();
          setCharacters(response.results);
        } else {
          const response = await rickandmortyapi.getCharacters(1, searchTerm);
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
  }, [searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    characters,
    loading,
  };
};
