import React from 'react';
import './App.css';
import './index.css';
import { NotesProvider } from './notes/context/NotesContext';
import Header from './notes/components/Header';
import SearchBar from './notes/components/SearchBar';
import NotesList from './notes/components/NotesList';
import NoteEditorModal from './notes/components/NoteEditorModal';
import ErrorBoundary from './notes/components/ErrorBoundary';

// PUBLIC_INTERFACE
function App() {
  /**
   * Root app for Notes.
   * It renders the layout, provides NotesContext, and includes the modal editor.
   */
  return (
    <ErrorBoundary>
      <NotesProvider>
        <div className="app-root">
          <Header />
          <main className="container">
            <SearchBar />
            <NotesList />
          </main>
          <NoteEditorModal />
        </div>
      </NotesProvider>
    </ErrorBoundary>
  );
}

export default App;
