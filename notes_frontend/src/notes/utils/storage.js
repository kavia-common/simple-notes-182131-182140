export const STORAGE_KEY = 'notes_app_v1';

/**
 * Safely parse JSON with fallback.
 */
function safeParse(json, fallback) {
  try {
    const data = JSON.parse(json);
    return Array.isArray(data) ? data : fallback;
  } catch {
    return fallback;
  }
}

/**
 * PUBLIC_INTERFACE
 * loadNotes reads from localStorage under migration-safe key and returns an array.
 */
export function loadNotes() {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    // Migration example: check legacy keys here if needed.
    return [];
  }
  return safeParse(raw, []);
}

/**
 * PUBLIC_INTERFACE
 * saveNotes writes notes array to localStorage. It no-ops if serialization fails.
 */
export function saveNotes(notes) {
  if (typeof window === 'undefined') return;
  try {
    const payload = JSON.stringify(notes);
    window.localStorage.setItem(STORAGE_KEY, payload);
  } catch (e) {
    // Storage full or blocked
    console.error('localStorage error', e);
  }
}
