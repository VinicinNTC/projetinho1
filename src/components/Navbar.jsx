import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <div className="navbar">
      <Link to="/" className="brand">Caderno</Link>
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/anotacoes">Minhas anotações</Link>
            <span>{user.email}</span>
            <button className="btn btn-quiet" onClick={handleLogout}>Sair</button>
          </>
        ) : (
          <>
            <Link to="/entrar">Entrar</Link>
            <Link to="/criar-conta" className="btn btn-primary">Criar conta</Link>
          </>
        )}
      </div>
    </div>
  )
}
