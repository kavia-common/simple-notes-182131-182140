import { useEffect, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * useDebouncedValue returns a debounced value after the specified delay.
 */
export function useDebouncedValue(value, delay = 200) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}
