import React, { useEffect, useId, useRef, useState } from 'react';
import { useNotes } from '../context/NotesContext';

/**
 * PUBLIC_INTERFACE
 * NoteEditorModal is an accessible modal dialog for creating/editing notes.
 */
export default function NoteEditorModal() {
  const { editorState, closeModal, createNote, updateNote } = useNotes();
  const isOpen = editorState.isOpen;
  const isEditing = Boolean(editorState.note);
  const titleId = useId();
  const descId = useId();
  const initialTitle = isEditing ? editorState.note.title : '';
  const initialContent = isEditing ? editorState.note.content : '';

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const modalRef = useRef(null);
  const firstFieldRef = useRef(null);
  const lastFocusedRef = useRef(null);

  // Reset fields when mode changes
  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [isEditing, initialTitle, initialContent]);

  // Focus management for modal open/close
  useEffect(() => {
    if (isOpen) {
      lastFocusedRef.current = document.activeElement;
      setTimeout(() => {
        firstFieldRef.current?.focus();
      }, 0);
      // Prevent background scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      lastFocusedRef.current?.focus?.();
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateNote(editorState.note.id, { title: title.trim() || 'Untitled', content });
    } else {
      createNote({ title: title.trim() || 'Untitled', content });
    }
    closeModal();
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      closeModal();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      onKeyDown={onKeyDown}
    >
      <div
        ref={modalRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
      >
        <div className="modal-header">
          <h2 id={titleId}>{isEditing ? 'Edit Note' : 'New Note'}</h2>
          <button
            className="icon-button"
            aria-label="Close editor"
            onClick={closeModal}
          >
            ×
          </button>
        </div>
        <p id={descId} className="visually-hidden">
          {isEditing ? 'Edit the fields and save changes.' : 'Enter a title and content for your note and save.'}
        </p>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="note-title">Title</label>
            <input
              id="note-title"
              ref={firstFieldRef}
              className="input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              required
              aria-required="true"
              maxLength={200}
            />
          </div>
          <div className="form-group">
            <label htmlFor="note-content">Content</label>
            <textarea
              id="note-content"
              className="textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              rows={8}
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="btn btn-ghost" onClick={closeModal}>Cancel</button>
            <button type="submit" className="btn btn-primary">{isEditing ? 'Save' : 'Create'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
