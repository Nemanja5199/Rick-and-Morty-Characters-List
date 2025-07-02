import type { Character, CharacterStatus, CharacterGender } from '../types/character';

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

class RickAndMortyAPI   {

    async getCharacter(id : number): Promise<Character>{

        const url = `${BASE_URL}/character/${id}`;
        try{

            const response = await fetch(url);

            if(!response.ok){

                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data: Character = await response.json();
            return data;

            
        } catch(error){
            console.error('Error fetching characters:', error)
            throw error;
        }
    }


    async getCharacters(): Promise<CharacterApiResponse> {

        const url = `${BASE_URL}/character`;

        try{

            const response = await fetch(url);

            if(!response.ok){

                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data: CharacterApiResponse  = await response.json();
            return data ;

        } catch (error){
            console.error('Error fetching characters:', error)
            throw error;
        }


    }

}


export const rickandmortyapi = new RickAndMortyAPI();