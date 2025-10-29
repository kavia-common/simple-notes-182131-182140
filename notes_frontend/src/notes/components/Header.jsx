import React, { useEffect, useState } from 'react';
import { useNotes } from '../context/NotesContext';

/**
 * PUBLIC_INTERFACE
 * Header displays app title and main action controls.
 */
export default function Header() {
  const { openCreateModal } = useNotes();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.style.setProperty('color-scheme', 'light');
  }, []);

  return (
    <header className="header">
      <div className="container header-inner">
        <h1 className="app-title" aria-label="Simple Notes Application">Simple Notes</h1>
        <div className="header-actions">
          <button
            className="btn btn-primary"
            onClick={openCreateModal}
            aria-label="Create a new note"
          >
            + New Note
          </button>
        </div>
      </div>
    </header>
  );
}
