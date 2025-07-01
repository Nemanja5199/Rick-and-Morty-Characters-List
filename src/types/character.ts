
export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';


export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';


export const CHARACTER_STATUS = {
  ALIVE: 'Alive' as const,
  DEAD: 'Dead' as const,
  UNKNOWN: 'unknown' as const,
} as const;

export const CHARACTER_GENDER = {
  FEMALE: 'Female' as const,
  MALE: 'Male' as const,
  GENDERLESS: 'Genderless' as const,
  UNKNOWN: 'unknown' as const,
} as const;

export interface Location{
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender: CharacterGender;
  origin: Location;
  location: Location;
  image: string; 
  episode: string[]; 
  url: string; 
  created: string;
}