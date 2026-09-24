import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import NoteCard from '../components/NoteCard.jsx'

function storageKey(email) {
  return `caderno_notes_${email}`
}

export default function Notes() {
  const { user } = useAuth()
  const [notes, setNotes] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(storageKey(user.email))
    setNotes(saved ? JSON.parse(saved) : [])
  }, [user.email])

  function persist(updated) {
    setNotes(updated)
    localStorage.setItem(storageKey(user.email), JSON.stringify(updated))
  }

  function resetForm() {
    setTitle('')
    setContent('')
    setEditingId(null)
    setShowForm(false)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return

    if (editingId) {
      const updated = notes.map((n) =>
        n.id === editingId ? { ...n, title, content, updatedAt: Date.now() } : n
      )
      persist(updated)
    } else {
      const newNote = {
        id: crypto.randomUUID(),
        title,
        content,
        updatedAt: Date.now(),
      }
      persist([newNote, ...notes])
    }
    resetForm()
  }

  function handleEdit(note) {
    setEditingId(note.id)
    setTitle(note.title)
    setContent(note.content)
    setShowForm(true)
  }

  function handleDelete(id) {
    persist(notes.filter((n) => n.id !== id))
    if (editingId === id) resetForm()
  }

  return (
    <div>
      <div className="notes-toolbar">
        <h2>Minhas anotações</h2>
        {!showForm && (
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            Nova anotação
          </button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="sample-note" style={{ borderStyle: 'solid', marginBottom: 28 }}>
          <div className="field">
            <label htmlFor="title">Título</label>
            <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="field">
            <label htmlFor="content">Conteúdo</label>
            <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} />
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Salvar alterações' : 'Adicionar'}
            </button>
            <button type="button" className="btn btn-quiet" onClick={resetForm}>Cancelar</button>
          </div>
        </form>
      )}

      {notes.length === 0 ? (
        <div className="empty-state">Você ainda não tem anotações. Que tal escrever a primeira?</div>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
