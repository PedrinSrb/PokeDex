import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/dashboard">
          <span className="brand-ball">◉</span>
          <span>
            <strong>Pokémon</strong>
            <small>Trainer Hub</small>
          </span>
        </NavLink>

        <nav className="main-nav">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/pokedex">Pokédex</NavLink>
          <NavLink to="/tipos">Tipos</NavLink>
          <NavLink to="/favoritos">Favoritos</NavLink>
        </nav>

        <div className="user-area">
          <span className="user-name">👤 {user}</span>
          <button className="button button-small button-outline" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </header>

      <main className="page-content">
        <Outlet />
      </main>

      <footer className="footer">
        <span>Pokémon Trainer Hub</span>
        <span>Projeto acadêmico • Dados fornecidos pela PokéAPI</span>
      </footer>
    </div>
  )
}