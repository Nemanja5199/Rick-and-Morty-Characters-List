import type {
  Character,
} from "../types/character";

import axios from "axios";

export interface CharacterApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

const BASE_URL = "https://rickandmortyapi.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

class RickAndMortyAPI {
  async getCharacter(id: number): Promise<Character> {
    try {
      const response = await api.get<Character>(`/character/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching characters:", error);
      throw error;
    }
  }

  async getCharacters(
    page: number = 1,
    searchName?: string,
    status: string = "",
    gender: string = ""
  ): Promise<CharacterApiResponse> {
    try {
      let url = `/character?page=${page}`;

      if (searchName?.trim()) {
        url += `&name=${searchName}`;
      }

      if(status.trim()){
        url += `&status=${status}`;
      }

       if(gender.trim()){
      url += `&gender=${gender}`;
    }
      const response = api.get<CharacterApiResponse>(url);
      return (await response).data;
    } catch (error) {
      console.error("Error fetching characters:", error);
      throw error;
    }
  }
}

export const rickandmortyapi = new RickAndMortyAPI();
