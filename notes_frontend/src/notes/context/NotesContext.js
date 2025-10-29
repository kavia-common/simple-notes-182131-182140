import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { loadNotes, saveNotes, STORAGE_KEY } from '../utils/storage';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

/**
 * Note type
 * { id: string, title: string, content: string, createdAt: number, updatedAt: number }
 */

const NotesContext = createContext(null);

/**
 * Generate a simple unique id using timestamp and random.
 */
function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * PUBLIC_INTERFACE
 * NotesProvider wraps app providing notes state, CRUD, search, and modal handling.
 */
export function NotesProvider({ children }) {
  const [notes, setNotes] = useState(() => {
    try {
      return loadNotes();
    } catch (e) {
      console.error('Failed to load notes from storage', e);
      return [];
    }
  });

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 200);

  const [editorState, setEditorState] = useState({
    isOpen: false,
    note: null // null => creating; object => editing
  });

  // Persist notes on change
  useEffect(() => {
    try {
      saveNotes(notes);
    } catch (e) {
      console.error('Failed to save notes', e);
    }
  }, [notes]);

  // CRUD operations
  const createNote = useCallback((partial) => {
    const now = Date.now();
    const newNote = {
      id: uid(),
      title: partial.title?.trim() || 'Untitled',
      content: partial.content || '',
      createdAt: now,
      updatedAt: now
    };
    setNotes(prev => [newNote, ...prev]);
    return newNote;
  }, []);

  const updateNote = useCallback((id, updates) => {
    setNotes(prev =>
      prev.map(n => (n.id === id ? { ...n, ...updates, updatedAt: Date.now() } : n))
    );
  }, []);

  const deleteNote = useCallback((id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  }, []);

  // Modal handling
  const openCreateModal = useCallback(() => {
    setEditorState({ isOpen: true, note: null });
  }, []);
  const openEditModal = useCallback((note) => {
    setEditorState({ isOpen: true, note });
  }, []);
  const closeModal = useCallback(() => {
    setEditorState({ isOpen: false, note: null });
  }, []);

  // Derived filtered notes by debounced query
  const filteredNotes = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(n =>
      n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );
  }, [notes, debouncedQuery]);

  const value = useMemo(
    () => ({
      notes,
      filteredNotes,
      createNote,
      updateNote,
      deleteNote,
      query,
      setQuery,
      editorState,
      openCreateModal,
      openEditModal,
      closeModal,
      storageKey: STORAGE_KEY
    }),
    [
      notes,
      filteredNotes,
      createNote,
      updateNote,
      deleteNote,
      query,
      editorState,
      openCreateModal,
      openEditModal,
      closeModal
    ]
  );

  return <NotesContext.Provider value={value}>{children}</NotesContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useNotes provides the NotesContext value with runtime guard.
 */
export function useNotes() {
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error('useNotes must be used within NotesProvider');
  return ctx;
}
