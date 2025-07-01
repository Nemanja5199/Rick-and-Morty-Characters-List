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



class RickAndMortyAPI   {


    async getCharacter(id : number): Promise<Character>{

        const url = `https://rickandmortyapi.com/api/character/${id}`;


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

}


export const rickandmortyapi = new RickAndMortyAPI();