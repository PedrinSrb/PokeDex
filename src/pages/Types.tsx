import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPokemonType, getTypes, getPokemon, getPokemonImage } from '../services/pokeApi'
import type { Pokemon } from '../types/pokemon'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'

const colors: Record<string, string> = {
  normal: '⚪', fire: '🔥', water: '💧', electric: '⚡', grass: '🌿', ice: '❄️',
  fighting: '🥊', poison: '☠️', ground: '🌎', flying: '🪽', psychic: '🔮', bug: '🐛',
  rock: '🪨', ghost: '👻', dragon: '🐉', dark: '🌑', steel: '⚙️', fairy: '✨'
}

export default function Types() {
  const [types, setTypes] = useState<Array<{ name: string; url: string }>>([])
  const [selected, setSelected] = useState('fire')
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadTypes = async () => {
    try {
      setLoading(true)
      const data = await getTypes()
      setTypes(data)
      const selectedType = data.find((item) => item.name === selected) ?? data[0]
      if (selectedType) await loadType(selectedType.name)
    } catch {
      setError('Não foi possível carregar os tipos.')
    } finally {
      setLoading(false)
    }
  }

  const loadType = async (name: string) => {
    try {
      setSelected(name)
      setError('')
      setLoading(true)
      const data = await getPokemonType(name)
      const details = await Promise.all(data.pokemon.slice(0, 12).map((item) => getPokemon(item.pokemon.name)))
      setPokemon(details)
    } catch {
      setError('Não foi possível carregar os Pokémon deste tipo.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadTypes() }, [])

  return (
    <div>
      <section className="page-heading">
        <div>
          <span className="eyebrow">EXPLORAÇÃO</span>
          <h1>Tipos Pokémon</h1>
          <p>Escolha um tipo para descobrir Pokémon relacionados.</p>
        </div>
      </section>

      {error && <ErrorState message={error} onRetry={loadTypes} />}

      {!error && (
        <>
          <div className="type-selector">
            {types.map((type) => (
              <button key={type.name} className={`type-selector-button ${selected === type.name ? 'selected' : ''}`} onClick={() => loadType(type.name)}>
                <span>{colors[type.name] ?? '◉'}</span>
                {type.name}
              </button>
            ))}
          </div>

          {loading ? <Loading text={`Buscando Pokémon do tipo ${selected}...`} /> : (
            <section className="type-result">
              <div className="section-heading">
                <div><span className="eyebrow">TIPO SELECIONADO</span><h2>{selected}</h2></div>
                <span className="move-count">{pokemon.length} exibidos</span>
              </div>
              <div className="mini-pokemon-grid">
                {pokemon.map((item) => (
                  <Link className="mini-pokemon" to={`/pokemon/${item.name}`} key={item.id}>
                    <img src={getPokemonImage(item)} alt={item.name} />
                    <div><span>#{String(item.id).padStart(3, '0')}</span><strong>{item.name}</strong></div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}