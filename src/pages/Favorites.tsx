import { useEffect, useState } from 'react'
import type { Pokemon } from '../types/pokemon'
import { getPokemon } from '../services/pokeApi'
import { useFavorites } from '../context/FavoritesContext'
import PokemonCard from '../components/PokemonCard'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'
import { Link } from 'react-router-dom'

export default function Favorites() {
  const { favorites } = useFavorites()
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    if (favorites.length === 0) {
      setPokemon([])
      return
    }
    try {
      setLoading(true)
      setError('')
      const details = await Promise.all(favorites.map((id) => getPokemon(id)))
      setPokemon(details)
    } catch {
      setError('Não foi possível carregar seus favoritos.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [favorites.join(',')])

  return (
    <div>
      <section className="page-heading">
        <div>
          <span className="eyebrow">SUA COLEÇÃO</span>
          <h1>Favoritos</h1>
          <p>Os Pokémon que você escolheu guardar para consultar rapidamente.</p>
        </div>
      </section>

      {loading && <Loading text="Carregando sua coleção..." />}
      {error && <ErrorState message={error} onRetry={load} />}
      {!loading && !error && favorites.length === 0 && (
        <div className="empty-state">
          <div className="empty-ball">☆</div>
          <h2>Sua coleção está vazia</h2>
          <p>Explore a Pokédex e clique na estrela para adicionar Pokémon aos favoritos.</p>
          <Link className="button button-primary" to="/pokedex">Explorar Pokédex</Link>
        </div>
      )}
      {!loading && !error && pokemon.length > 0 && (
        <div className="pokemon-grid">
          {pokemon.map((item) => <PokemonCard key={item.id} pokemon={item} />)}
        </div>
      )}
    </div>
  )
}