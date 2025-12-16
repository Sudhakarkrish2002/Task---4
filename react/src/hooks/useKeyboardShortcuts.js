import { useEffect } from 'react';
import { isMac } from '../utils/platform';

export const useKeyboardShortcuts = (shortcuts, enabled = true) => {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event) => {
      const isMacOS = isMac();
      const modifier = isMacOS ? event.metaKey : event.ctrlKey;
      const key = event.key.toLowerCase();

      // Build shortcut key string
      let shortcutKey = key;
      if (modifier) {
        shortcutKey = `${isMacOS ? 'Meta' : 'Control'}+${key}`;
      } else if (event.altKey) {
        shortcutKey = `Alt+${key}`;
      } else if (event.shiftKey && key !== 'shift') {
        shortcutKey = `Shift+${key}`;
      }

      // Check for exact match first
      let handler = shortcuts[shortcutKey];
      
      // Fallback to just the key if no modifier handler exists
      if (!handler && !modifier && !event.altKey && !event.shiftKey) {
        handler = shortcuts[key];
      }

      if (handler) {
        event.preventDefault();
        event.stopPropagation();
        handler(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enabled]);
};

export default useKeyboardShortcuts;

