import React from 'react';
import { useNotes } from '../context/NotesContext';
import NoteListItem from './NotesListItem';

/**
 * PUBLIC_INTERFACE
 * NotesList renders filtered notes and empty states.
 */
export default function NotesList() {
  const { filteredNotes, query } = useNotes();

  if (!filteredNotes.length && !query) {
    return (
      <section aria-live="polite" className="empty-state">
        <div className="empty-card">
          <h2>No notes yet</h2>
          <p>Click "New Note" to create your first note.</p>
        </div>
      </section>
    );
  }

  if (!filteredNotes.length && query) {
    return (
      <section aria-live="polite" className="empty-state">
        <div className="empty-card">
          <h2>No results</h2>
          <p>No notes found for your search. Try a different term.</p>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Notes list" className="notes-grid">
      {filteredNotes.map(note => (
        <NoteListItem key={note.id} note={note} />
      ))}
    </section>
  );
}
