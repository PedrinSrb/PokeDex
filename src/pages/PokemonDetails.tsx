import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { Pokemon } from '../types/pokemon'
import { getPokemon, getPokemonImage } from '../services/pokeApi'
import { typeLabel } from '../components/PokemonCard'
import { useFavorites } from '../context/FavoritesContext'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'

export default function PokemonDetails() {
  const { name } = useParams()
  const { isFavorite, toggleFavorite } = useFavorites()
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    if (!name) return
    try {
      setLoading(true)
      setError('')
      setPokemon(await getPokemon(name))
    } catch {
      setError('Pokémon não encontrado ou indisponível na PokéAPI.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [name])

  if (loading) return <Loading text="Carregando ficha do Pokémon..." />
  if (error || !pokemon) return <ErrorState message={error} onRetry={load} />

  return (
    <div>
      <Link to="/pokedex" className="back-link">← Voltar para a Pokédex</Link>

      <section className="detail-hero">
        <div className="detail-image">
          <img src={getPokemonImage(pokemon)} alt={pokemon.name} />
        </div>

        <div className="detail-summary">
          <span className="pokemon-number">#{String(pokemon.id).padStart(3, '0')}</span>
          <h1>{pokemon.name}</h1>
          <div className="type-list">
            {pokemon.types.map(({ type }) => <span className={`type-badge type-${type.name}`} key={type.name}>{typeLabel(type.name)}</span>)}
          </div>
          <p>Ficha completa de <strong>{pokemon.name}</strong>, com características, habilidades e estatísticas base.</p>
          <button className={`button ${isFavorite(pokemon.id) ? 'button-favorite' : 'button-primary'}`} onClick={() => toggleFavorite(pokemon.id)}>
            {isFavorite(pokemon.id) ? '★ Remover dos favoritos' : '☆ Adicionar aos favoritos'}
          </button>
        </div>
      </section>

      <div className="detail-grid">
        <section className="info-card">
          <h2>Características</h2>
          <div className="info-list">
            <div><span>Altura</span><strong>{(pokemon.height / 10).toFixed(1)} m</strong></div>
            <div><span>Peso</span><strong>{(pokemon.weight / 10).toFixed(1)} kg</strong></div>
            <div><span>Experiência base</span><strong>{pokemon.base_experience ?? '—'}</strong></div>
          </div>
        </section>

        <section className="info-card">
          <h2>Habilidades</h2>
          <div className="chip-list">
            {pokemon.abilities.map((item) => <span className="chip" key={item.ability.name}>{item.ability.name}{item.is_hidden ? ' · oculta' : ''}</span>)}
          </div>
        </section>
      </div>

      <section className="info-card stats-card">
        <h2>Estatísticas base</h2>
        <div className="stats-list">
          {pokemon.stats.map((item) => (
            <div className="stat-row" key={item.stat.name}>
              <div className="stat-label"><span>{item.stat.name.replace('-', ' ')}</span><strong>{item.base_stat}</strong></div>
              <div className="stat-track"><div className="stat-fill" style={{ width: `${Math.min(item.base_stat / 2.55, 100)}%` }} /></div>
            </div>
          ))}
        </div>
      </section>

      <section className="info-card moves-card">
        <div className="section-heading compact">
          <div><h2>Movimentos</h2><p>Alguns movimentos registrados pela PokéAPI.</p></div>
          <span className="move-count">{pokemon.moves.length} movimentos</span>
        </div>
        <div className="moves-list">
          {pokemon.moves.slice(0, 30).map((item) => <span className="chip" key={item.move.name}>{item.move.name}</span>)}
        </div>
      </section>
    </div>
  )
}