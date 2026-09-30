import { Link } from 'react-router-dom'
import type { Pokemon } from '../types/pokemon'
import { getPokemonImage } from '../services/pokeApi'
import { useFavorites } from '../context/FavoritesContext'

const typeLabels: Record<string, string> = {
  normal: 'Normal', fire: 'Fogo', water: 'Água', electric: 'Elétrico',
  grass: 'Planta', ice: 'Gelo', fighting: 'Lutador', poison: 'Veneno',
  ground: 'Terrestre', flying: 'Voador', psychic: 'Psíquico', bug: 'Inseto',
  rock: 'Pedra', ghost: 'Fantasma', dragon: 'Dragão', dark: 'Sombrio',
  steel: 'Aço', fairy: 'Fada',
}

export function typeLabel(type: string) {
  return typeLabels[type] ?? type
}

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const { isFavorite, toggleFavorite } = useFavorites()

  return (
    <article className="pokemon-card">
      <button
        className={`favorite-button ${isFavorite(pokemon.id) ? 'active' : ''}`}
        onClick={() => toggleFavorite(pokemon.id)}
        aria-label={isFavorite(pokemon.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        title={isFavorite(pokemon.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        {isFavorite(pokemon.id) ? '★' : '☆'}
      </button>

      <Link to={`/pokemon/${pokemon.name}`} className="pokemon-card-link">
        <span className="pokemon-number">#{String(pokemon.id).padStart(3, '0')}</span>
        <div className="pokemon-image-wrap">
          <img src={getPokemonImage(pokemon)} alt={pokemon.name} />
        </div>
        <h3>{pokemon.name}</h3>
        <div className="type-list">
          {pokemon.types.map(({ type }) => (
            <span className={`type-badge type-${type.name}`} key={type.name}>
              {typeLabel(type.name)}
            </span>
          ))}
        </div>
      </Link>
    </article>
  )
}