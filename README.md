# Caderno — app de anotações com login

Projeto React (Vite) com autenticação mockada e anotações protegidas por login.

## Como rodar

```bash
npm install
npm run dev
```

Abra o endereço que o Vite mostrar no terminal (geralmente http://localhost:5173).

## Como funciona

- **Autenticação mockada**: `src/context/AuthContext.jsx` guarda usuários e sessão no
  `localStorage` (sem backend). Dá pra trocar por Firebase, Supabase etc. depois.
- **Rota pública**: `/` — landing page com um exemplo estático.
- **Rotas de auth**: `/entrar` e `/criar-conta`.
- **Rota protegida**: `/anotacoes` — só acessível logado (`ProtectedRoute.jsx` redireciona
  pra `/entrar` se não houver usuário).
- **CRUD de anotações**: cada usuário tem suas próprias anotações salvas em
  `localStorage`, na chave `caderno_notes_<email>`.

## Estrutura

```
src/
  context/AuthContext.jsx   -> estado de login (Context API)
  components/
    Navbar.jsx
    ProtectedRoute.jsx
    NoteCard.jsx
  pages/
    Home.jsx
    Login.jsx
    Register.jsx
    Notes.jsx
  App.jsx                   -> rotas
  main.jsx                  -> entrada da aplicação
```

## Próximos passos possíveis

- Trocar o mock de auth por um backend real (Firebase Auth, Supabase, etc.)
- Adicionar busca/filtro de anotações
- Adicionar categorias ou tags
- Persistir em uma API em vez de localStorage
