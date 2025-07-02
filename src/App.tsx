import { useEffect, useState } from "react"
import type { Character } from "./types/character"
import { rickandmortyapi } from './api/api';

function App() {


const [characters, setCharacters] = useState<Character[]>([]);
const [loading, setLoading] = useState(true);


useEffect(() => {

const fetchCharacter  = async() => {

try{
const response  = await rickandmortyapi.getCharacters();
setCharacters(response.results);
}catch(error){
  console.error('Failed to fetch character:', error);
} 
};

fetchCharacter();
}, []);



  return (

    <div>

    <h1 className="text-3xl font-bold mb-6"> Rick and Morty Characters</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
    {characters.map(character =>(

    <div key = {character.id} className="bg-white rounded-lg shadow-md p-4 max-w-sm mx-auto md:max-w-none">
      <img src={character.image} alt= {character.name} className="rounded-lg w-full aspect-square object-cover rounded mb-3"/>


      <h2 className="font-bold text-lg">{character.name}</h2>
      <p className="text-gray-600">{character.status}</p>
      <p className="text-gray-500 text-sm">{character.species}</p>
    </div>


    ))}

    </div>



    </div>

   
  );
}

export default App
