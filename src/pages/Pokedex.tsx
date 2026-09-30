import { useEffect, useMemo, useState } from 'react'
import type { Pokemon } from '../types/pokemon'
import { getPokemon, getPokemonPage, getPokemonType, getIdFromUrl, getTypes } from '../services/pokeApi'
import PokemonCard from '../components/PokemonCard'
import Loading from '../components/Loading'
import ErrorState from '../components/ErrorState'

const PAGE_SIZE = 24

export default function Pokedex() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([])
  const [search, setSearch] = useState('')
  const [type, setType] = useState('all')
  const [types, setTypes] = useState<Array<{ name: string; url: string }>>([])
  const [page, setPage] = useState(0)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filterLoading, setFilterLoading] = useState(false)
  const [error, setError] = useState('')

  const loadPage = async (pageNumber = page) => {
    try {
      setLoading(true)
      setError('')
      const response = await getPokemonPage(PAGE_SIZE, pageNumber * PAGE_SIZE)
      const details = await Promise.all(response.results.map((item) => getPokemon(getIdFromUrl(item.url))))
      setPokemon(details)
      setTotal(response.count)
    } catch {
      setError('Não foi possível carregar a Pokédex. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPage(0)
    getTypes().then(setTypes).catch(() => {})
  }, [])

  const handleType = async (value: string) => {
    setType(value)
    setPage(0)
    if (value === 'all') {
      await loadPage(0)
      return
    }

    try {
      setFilterLoading(true)
      setError('')
      const response = await getPokemonType(value)
      const first = response.pokemon.slice(0, 60)
      const details = await Promise.all(first.map((item) => getPokemon(item.pokemon.name)))
      setPokemon(details)
      setTotal(response.pokemon.length)
    } catch {
      setError('Não foi possível carregar esse tipo.')
    } finally {
      setFilterLoading(false)
    }
  }

  const filtered = useMemo(() => {
    const term = search.toLowerCase().trim()
    if (!term) return pokemon
    return pokemon.filter((item) => item.name.includes(term) || String(item.id) === term)
  }, [pokemon, search])

  const totalPages = Math.ceil(total / PAGE_SIZE)

  return (
    <div>
      <section className="page-heading">
        <div>
          <span className="eyebrow">CATÁLOGO</span>
          <h1>Pokédex</h1>
          <p>Pesquise e filtre Pokémon para encontrar exatamente o que procura.</p>
        </div>
      </section>

      <div className="filters-panel">
        <label className="search-field">
          <span>⌕</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nome ou número..." />
        </label>

        <label className="select-field">
          <span>Tipo</span>
          <select value={type} onChange={(e) => handleType(e.target.value)}>
            <option value="all">Todos os tipos</option>
            {types.map((item) => <option value={item.name} key={item.name}>{item.name}</option>)}
          </select>
        </label>
      </div>

      {loading || filterLoading ? <Loading text="Consultando a PokéAPI..." /> : null}
      {error && !loading && !filterLoading ? <ErrorState message={error} onRetry={() => loadPage(page)} /> : null}

      {!loading && !filterLoading && !error && (
        <>
          <div className="results-bar">
            <span><strong>{filtered.length}</strong> Pokémon exibidos</span>
            {search && <button className="clear-search" onClick={() => setSearch('')}>Limpar busca ×</button>}
          </div>

          {filtered.length > 0 ? (
            <div className="pokemon-grid">
              {filtered.map((item) => <PokemonCard key={item.id} pokemon={item} />)}
            </div>
          ) : (
            <div className="state-card"><div className="state-icon">🔍</div><h3>Nenhum Pokémon encontrado</h3><p>Tente outro nome, número ou remova o filtro de busca.</p></div>
          )}

          {type === 'all' && !search && (
            <div className="pagination">
              <button className="button button-outline" disabled={page === 0} onClick={() => { const next = page - 1; setPage(next); loadPage(next) }}>← Anterior</button>
              <span>Página <strong>{page + 1}</strong> de {totalPages}</span>
              <button className="button button-outline" disabled={page >= totalPages - 1} onClick={() => { const next = page + 1; setPage(next); loadPage(next) }}>Próxima →</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}