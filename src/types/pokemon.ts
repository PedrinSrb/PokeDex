export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonListResponse {
  results: PokemonListItem[]
  next: string | null
  previous: string | null
  count: number
}

export interface PokemonTypeSlot {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface PokemonAbility {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
  slot: number
}

export interface PokemonMove {
  move: {
    name: string
    url: string
  }
}

export interface PokemonSprites {
  front_default: string | null
  front_shiny: string | null
  other?: {
    'official-artwork'?: {
      front_default: string | null
    }
  }
}

export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number | null
  types: PokemonTypeSlot[]
  stats: PokemonStat[]
  abilities: PokemonAbility[]
  moves: PokemonMove[]
  sprites: PokemonSprites
}

export interface PokemonType {
  id: number
  name: string
  pokemon: Array<{
    pokemon: PokemonListItem
    slot: number
  }>
}