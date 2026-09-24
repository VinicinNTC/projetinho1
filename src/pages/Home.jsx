import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Home() {
  const { user } = useAuth()

  return (
    <div className="hero">
      <h1>Um caderno simples, sempre à mão.</h1>
      <p>
        Escreva ideias soltas, listas e lembretes rápidos. Suas anotações ficam
        guardadas só pra você — crie uma conta pra começar a escrever.
      </p>

      {!user && (
        <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
          <Link to="/criar-conta" className="btn btn-primary">Criar conta grátis</Link>
          <Link to="/entrar" className="btn">Já tenho conta</Link>
        </div>
      )}

      <div className="sample-note">
        <h3>Exemplo — Ideias para o fim de semana</h3>
        <p>Entre ou crie uma conta para ver e escrever suas próprias anotações.</p>
      </div>
    </div>
  )
}
