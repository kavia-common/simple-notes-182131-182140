import React from 'react';
import { useNotes } from '../context/NotesContext';

/**
 * PUBLIC_INTERFACE
 * NoteListItem shows a single note card with edit/delete actions.
 */
export default function NoteListItem({ note }) {
  const { openEditModal, deleteNote } = useNotes();

  const onDelete = () => {
    // Basic UX confirmation
    // eslint-disable-next-line no-restricted-globals
    const ok = window.confirm(`Delete note "${note.title}"? This cannot be undone.`);
    if (ok) deleteNote(note.id);
  };

  const updated = new Date(note.updatedAt).toLocaleString();

  return (
    <article className="note-card" aria-labelledby={`note-title-${note.id}`}>
      <h3 id={`note-title-${note.id}`} className="note-title">{note.title}</h3>
      <p className="note-content">{note.content}</p>
      <div className="note-footer">
        <span className="note-updated" aria-label={`Last updated ${updated}`}>Updated {updated}</span>
        <div className="note-actions">
          <button className="btn btn-secondary" onClick={() => openEditModal(note)} aria-label={`Edit note ${note.title}`}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={onDelete} aria-label={`Delete note ${note.title}`}>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
