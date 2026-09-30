import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Pokemon } from '../types/pokemon'
import { getPokemon, getPokemonImage } from '../services/pokeApi'
import { useFavorites } from '../context/FavoritesContext'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'

export default function Dashboard() {
  const { favorites } = useFavorites()
  const [featured, setFeatured] = useState<Pokemon | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    try {
      setLoading(true)
      setError('')
      const randomId = Math.floor(Math.random() * 151) + 1
      setFeatured(await getPokemon(randomId))
    } catch {
      setError('A PokéAPI não respondeu. Verifique sua conexão.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div>
      <section className="hero">
        <div>
          <span className="eyebrow">CENTRAL DO TREINADOR</span>
          <h1>Explore o mundo Pokémon.</h1>
          <p>Consulte informações, encontre seus favoritos e descubra novas espécies para sua coleção.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/pokedex">Explorar Pokédex</Link>
            <Link className="button button-light" to="/tipos">Explorar tipos</Link>
          </div>
        </div>
        <div className="hero-decoration">⚡</div>
      </section>

      <section className="stats-grid">
        <div className="stat-card"><span>🔎</span><div><strong>1010+</strong><small>Pokémon disponíveis</small></div></div>
        <div className="stat-card"><span>⭐</span><div><strong>{favorites.length}</strong><small>Favoritos salvos</small></div></div>
        <div className="stat-card"><span>🧭</span><div><strong>18</strong><small>Tipos principais</small></div></div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">DESCOBERTA</span>
            <h2>Pokémon em destaque</h2>
          </div>
          <button className="button button-outline" onClick={load}>↻ Outro Pokémon</button>
        </div>

        {loading && <Loading text="Sorteando um Pokémon..." />}
        {error && <ErrorState message={error} onRetry={load} />}
        {featured && !loading && !error && (
          <div className="featured-card">
            <div className="featured-image">
              <img src={getPokemonImage(featured)} alt={featured.name} />
            </div>
            <div className="featured-info">
              <span className="pokemon-number">#{String(featured.id).padStart(3, '0')}</span>
              <h3>{featured.name}</h3>
              <div className="type-list">
                {featured.types.map(({ type }) => <span className={`type-badge type-${type.name}`} key={type.name}>{type.name}</span>)}
              </div>
              <p>Confira estatísticas, habilidades, movimentos e outras informações deste Pokémon.</p>
              <Link className="button button-primary" to={`/pokemon/${featured.name}`}>Ver detalhes →</Link>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}