import type { Character } from "../../types/character";

export const CharacterCard = ({ character }: { character: Character }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Alive":
        return "bg-emerald-500";
      case "Dead":
        return "bg-red-500";
      case "unknown":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case "Male":
        return "♂";
      case "Female":
        return "♀";
      case "Genderless":
        return "⚪";
      default:
        return "?";
    }
  };

  return (
    <div
      className="rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-400/20 
                    transform hover:-translate-y-2 transition-all duration-300 overflow-hidden group 
                    w-full max-w-sm mx-auto border border-gray-600"
      style={{
        backgroundColor: "rgb(60, 68, 82)",
        fontFamily: "RickAndMorty2, sans-serif",
      }}
    >
      {/* Image container */}
      <div className="relative w-full aspect-square">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div
          className={`absolute top-3 right-3 px-2 py-1 rounded-full text-sm font-semibold text-white ${getStatusColor(character.status)}`}
        >
          {character.status}
        </div>
      </div>

      {/* Character Info */}
      <div className="p-4 flex flex-col h-52">
        {" "}
        {/* Increased height from h-48 to h-52 */}
        {/* Name and Gender */}
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-xl text-white truncate flex-1 leading-tight">
            {character.name}
          </h3>
          <span
            className="text-xl ml-2 flex-shrink-0 text-gray-300"
            title={character.gender}
          >
            {getGenderIcon(character.gender)}
          </span>
        </div>
        {/* Species */}
        <p className="text-gray-300 text-base mb-3">{character.species}</p>
        {/* Location Info */}
        <div className="flex-1 space-y-2 text-sm text-gray-400">
          <div>
            <span className="font-medium text-gray-200 block">
              Last known location:
            </span>
            <p className="truncate text-sm">{character.location.name}</p>
          </div>

          <div>
            <span className="font-medium text-gray-200 block">
              First seen in:
            </span>
            <p className="truncate text-sm">{character.origin.name}</p>
          </div>
        </div>
        {/* Episode count */}
        <div
          className="flex items-center justify-between pt-2 mt-auto"
          style={{ borderTop: "1px solid rgb(75, 85, 99)" }}
        >
          <span className="font-medium text-gray-200 text-sm">Episodes:</span>
          <span className="bg-blue-600 text-blue-100 px-2 py-1 rounded-full text-sm font-semibold">
            {character.episode.length}
          </span>
        </div>
      </div>
    </div>
  );
};
