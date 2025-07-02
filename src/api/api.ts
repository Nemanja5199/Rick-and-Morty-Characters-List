import type { Character, CharacterStatus, CharacterGender } from '../types/character';

import axios from 'axios';

export interface CharacterApiResponse {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: Character[];
}

const BASE_URL = 'https://rickandmortyapi.com/api';

const api = axios.create({

    baseURL:BASE_URL,
    timeout: 5000,

});

class RickAndMortyAPI   {

    async getCharacter(id : number): Promise<Character>{

        try{

            const response = await api.get<Character>(`/character/${id}`);
            return response.data;

        } catch(error){
            console.error('Error fetching characters:', error)
            throw error;
        }
    }


    async getCharacters(): Promise<CharacterApiResponse> {

        try{
            const response = await api.get<CharacterApiResponse>(`/character`)
            return response.data ;

        } catch (error){
            console.error('Error fetching characters:', error)
            throw error;
        }


    }

}


export const rickandmortyapi = new RickAndMortyAPI();