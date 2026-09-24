export default function NoteCard({ note, onEdit, onDelete }) {
  const date = new Date(note.updatedAt).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit',
  })

  return (
    <div className="note-card">
      <div className="note-card-head">
        <h3>{note.title}</h3>
        <time>{date}</time>
      </div>
      <p>{note.content}</p>
      <div className="note-actions">
        <button className="btn btn-quiet" onClick={() => onEdit(note)}>Editar</button>
        <button className="btn btn-quiet" onClick={() => onDelete(note.id)}>Excluir</button>
      </div>
    </div>
  )
}
