import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    try {
      register(email, password)
      navigate('/anotacoes')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="auth-card">
      <h2 style={{ marginBottom: 24 }}>Criar conta</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">E-mail</label>
          <input id="email" type="email" value={email} required
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="password">Senha</label>
          <input id="password" type="password" value={password} required minLength={4}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Criar conta
        </button>
      </form>
      <p style={{ marginTop: 18, fontSize: '0.9rem', color: 'var(--ink-soft)' }}>
        Já tem conta? <Link to="/entrar">Entrar</Link>
      </p>
    </div>
  )
}
