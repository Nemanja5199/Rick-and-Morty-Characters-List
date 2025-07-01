import { useEffect, useState } from "react"
import type { Character } from "./types/character"
import { rickandmortyapi } from './api/api';

function App() {


const [character, setCharacter] = useState<Character | null>(null);
const [loading, setLoading] = useState(true);


useEffect(() => {

const fetchCharacter  = async() => {

try{
const character = await rickandmortyapi.getCharacter(1);
setCharacter(character);
}catch(error){
  console.error('Failed to fetch character:', error);
} 
};

fetchCharacter();

}, []);


 if (!character) {
    return <div className="p-8 text-center">Failed to load character</div>;
  }

  return (

    <div className="p-8 max-w-md mx-auto">
    <h1 className="text- 2xl font-bold mb-4">Rick and Morty API Test</h1>
    <div className="border rounded-lg p-4">

    <img src = {character.image} alt={character.name} className="w-full h-64 object-cover rounded mb-4"/>
    
    <h2 className="text-xl font-bold">{character.name}</h2>

    </div>
    </div>
  );
}

export default App
