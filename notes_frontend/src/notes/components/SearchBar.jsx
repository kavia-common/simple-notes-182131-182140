import React, { useId } from 'react';
import { useNotes } from '../context/NotesContext';

/**
 * PUBLIC_INTERFACE
 * SearchBar provides debounced search input for notes list.
 */
export default function SearchBar() {
  const { query, setQuery } = useNotes();
  const id = useId();

  return (
    <div className="searchbar" role="search">
      <label className="visually-hidden" htmlFor={id}>Search notes</label>
      <input
        id={id}
        type="search"
        className="input"
        placeholder="Search notes by title or content..."
        aria-label="Search notes"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
