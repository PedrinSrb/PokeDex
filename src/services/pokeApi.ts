import type { Pokemon, PokemonListResponse, PokemonType } from '../types/pokemon'

const API_URL = 'https://pokeapi.co/api/v2'

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Erro na API: ${response.status}`)
  }

  return response.json() as Promise<T>
}

export async function getPokemonPage(limit = 24, offset = 0): Promise<PokemonListResponse> {
  return request<PokemonListResponse>(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`)
}

export async function getPokemon(nameOrId: string | number): Promise<Pokemon> {
  return request<Pokemon>(`${API_URL}/pokemon/${String(nameOrId).toLowerCase().trim()}`)
}

export async function getPokemonType(name: string): Promise<PokemonType> {
  return request<PokemonType>(`${API_URL}/type/${name}`)
}

export async function getTypes(): Promise<Array<{ name: string; url: string }>> {
  const data = await request<{ results: Array<{ name: string; url: string }> }>(`${API_URL}/type`)
  return data.results.filter((type) => !['unknown', 'shadow'].includes(type.name))
}

export function getPokemonImage(pokemon: Pokemon): string {
  return (
    pokemon.sprites.other?.['official-artwork']?.front_default ??
    pokemon.sprites.front_default ??
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png'
  )
}

export function getIdFromUrl(url: string): number {
  const parts = url.split('/').filter(Boolean)
  return Number(parts.at(-1))
}