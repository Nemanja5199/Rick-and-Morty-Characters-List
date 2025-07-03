import { renderHook, act } from '@testing-library/react'
import { useSearch } from '../hooks/useSearch'
import { vi } from 'vitest'

vi.mock('../services/api', () => ({
  rickandmortyapi: {
    getCharacters: vi.fn()
  }
}))

describe('useSearch', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useSearch())
    
    expect(result.current.searchTerm).toBe('')
    expect(result.current.characters).toEqual([])
    expect(result.current.loading).toBe(true)
    expect(result.current.hasMore).toBe(true)
  })

  it('updates search term', () => {
    const { result } = renderHook(() => useSearch())
    
    act(() => {
      result.current.setSearchTerm('rick')
    })
    
    expect(result.current.searchTerm).toBe('rick')
  })
})