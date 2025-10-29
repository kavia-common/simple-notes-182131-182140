# Simple Notes App (React)

A lightweight, modern, and responsive notes app with no authentication. Notes are stored locally in your browser.

## Features
- Create, edit, delete notes
- Search notes with debounced input
- Local persistence via `localStorage` using key `notes_app_v1`
- Accessible UI: labels, ARIA attributes, keyboard-friendly modal
- Responsive light theme with primary accents (#3b82f6, #06b6d4)

## Getting Started
From the `notes_frontend` directory:

- Install deps (first time):
  - npm install
- Start dev server:
  - npm start
- Open in your browser:
  - http://localhost:3000

## Usage
- Click “New Note” to create a note
- Edit or Delete via the actions on each note card
- Use the search box to filter by title or content

## Data and Persistence
Notes are saved in your browser’s localStorage under the key:
- notes_app_v1

Clearing browser storage will remove saved notes.

## Project Structure
- src/notes/context/NotesContext.js – app state, CRUD, persistence
- src/notes/components/* – UI components
- src/notes/hooks/useDebouncedValue.js – debounced search
- src/notes/utils/storage.js – robust load/save

## Tests
Run tests:
- npm test

No external services or env variables required.
