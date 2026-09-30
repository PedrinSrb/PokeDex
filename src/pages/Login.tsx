import { FormEvent, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('treinador')
  const [password, setPassword] = useState('pokemon123')
  const [error, setError] = useState('')

  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard'

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setError('')
    if (login(username.trim(), password)) {
      navigate(from, { replace: true })
    } else {
      setError('Usuário ou senha incorretos. Use as credenciais de demonstração.')
    }
  }

  return (
    <div className="login-page">
      <div className="login-visual">
        <div className="login-orb orb-one" />
        <div className="login-orb orb-two" />
        <div className="login-ball">◉</div>
        <p className="eyebrow">POKÉMON TRAINER HUB</p>
        <h1>Seu próximo desafio começa aqui.</h1>
        <p>Explore Pokémon, compare atributos, descubra tipos e monte sua coleção de favoritos.</p>
      </div>

      <div className="login-panel">
        <div className="login-form-wrap">
          <div className="mobile-logo">◉</div>
          <span className="eyebrow">ÁREA DO TREINADOR</span>
          <h2>Bem-vindo!</h2>
          <p className="muted">Entre para acessar sua Pokédex.</p>

          <form onSubmit={handleSubmit} className="form">
            <label>
              Usuário
              <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Digite seu usuário" />
            </label>

            <label>
              Senha
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua senha" />
            </label>

            {error && <div className="form-error">{error}</div>}

            <button className="button button-primary button-full" type="submit">
              Entrar na Pokédex →
            </button>
          </form>

          <div className="demo-box">
            <strong>Credenciais de demonstração</strong>
            <span>Usuário: <b>treinador</b></span>
            <span>Senha: <b>pokemon123</b></span>
          </div>

          <small className="login-note">Autenticação mockada para fins acadêmicos.</small>
        </div>
      </div>
    </div>
  )
}