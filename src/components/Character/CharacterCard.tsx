import type { Character } from "../../types/character";



export const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-sm mx-auto md:max-w-none">
      <img
        src={character.image}
        alt={character.name}
        className="w-full aspect-square object-cover rounded mb-3"
      />
      <h2 className="font-bold text-lg">{character.name}</h2>
      <p className="text-gray-600">{character.status}</p>
      <p className="text-gray-500 text-sm">{character.species}</p>
    </div>
  );
};
