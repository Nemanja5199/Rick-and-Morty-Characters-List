import { render, screen } from '@testing-library/react'
import { CharacterCard } from './CharacterCard'
import type { Character } from '../../types/character'

const mockCharacter: Character = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth (C-137)", url: "" },
  location: { name: "Citadel of Ricks", url: "" },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: ["ep1", "ep2", "ep3"],
  url: "",
  created: ""
}

describe('CharacterCard', () => {
  it('renders character information correctly', () => {
    render(<CharacterCard character={mockCharacter} />)
    
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument()
    expect(screen.getByText('Human')).toBeInTheDocument()
    expect(screen.getByText('Alive')).toBeInTheDocument()
    expect(screen.getByText('Citadel of Ricks')).toBeInTheDocument()
    expect(screen.getByText('Earth (C-137)')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument() // Episode count
  })

  it('displays correct status badge color for alive character', () => {
    render(<CharacterCard character={mockCharacter} />)
    
    const statusBadge = screen.getByText('Alive')
    expect(statusBadge).toHaveClass('bg-emerald-500')
  })

  it('displays correct gender icon', () => {
    render(<CharacterCard character={mockCharacter} />)
    
    const genderIcon = screen.getByTitle('Male')
    expect(genderIcon).toHaveTextContent('♂')
  })

  it('renders character image with correct alt text', () => {
    render(<CharacterCard character={mockCharacter} />)
    
    const image = screen.getByAltText('Rick Sanchez')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockCharacter.image)
  })
})