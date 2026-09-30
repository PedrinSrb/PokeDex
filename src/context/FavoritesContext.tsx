import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

interface FavoritesContextValue {
  favorites: number[]
  toggleFavorite: (id: number) => void
  isFavorite: (id: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('pth_favorites') ?? '[]')
    } catch {
      return []
    }
  })

  const toggleFavorite = (id: number) => {
    setFavorites((current) => {
      const next = current.includes(id)
        ? current.filter((favoriteId) => favoriteId !== id)
        : [...current, id]
      localStorage.setItem('pth_favorites', JSON.stringify(next))
      return next
    })
  }

  const isFavorite = (id: number) => favorites.includes(id)

  const value = useMemo(() => ({ favorites, toggleFavorite, isFavorite }), [favorites])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites deve ser usado dentro de FavoritesProvider')
  return context
}