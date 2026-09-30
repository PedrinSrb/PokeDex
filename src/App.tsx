import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { FavoritesProvider } from './context/FavoritesContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Pokedex from './pages/Pokedex'
import PokemonDetails from './pages/PokemonDetails'
import Favorites from './pages/Favorites'
import Types from './pages/Types'

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pokedex" element={<Pokedex />} />
              <Route path="/pokemon/:name" element={<PokemonDetails />} />
              <Route path="/favoritos" element={<Favorites />} />
              <Route path="/tipos" element={<Types />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </FavoritesProvider>
    </AuthProvider>
  )
}