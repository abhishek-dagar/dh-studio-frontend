import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { buttonClass } from '../lib/ui/button';

type Theme = 'light' | 'dark';

const readTheme = (): Theme => (document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');

/** Swaps the theme without color transitions: the guard lives for two frames, then lifts. */
const applyTheme = (theme: Theme): void => {
  const root = document.documentElement;
  root.dataset.themeSwitching = '';
  root.dataset.theme = theme;
  requestAnimationFrame(() => requestAnimationFrame(() => delete root.dataset.themeSwitching));
};

const rememberTheme = (theme: Theme): void => {
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // Storage can be blocked; the theme still applies for this visit.
  }
};

/** Switches the theme the inline head script already applied, and remembers the choice. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Follow data-theme, so every toggle on the page (header pill and menu) shows the same icon.
  useEffect(() => {
    setTheme(readTheme());
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const next: Theme = readTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    rememberTheme(next);
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={theme === null}
      // Firefox restores a button's dynamic disabled state on reload, so the server's
      // disabled would be gone before hydration. This opts the button out of that
      // (React's button types leave the attribute out, so it goes in as a plain one).
      {...{ autoComplete: 'off' }}
      aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
      className={buttonClass({ variant: 'ghost', size: 'md', iconOnly: true })}
    >
      {theme === 'light' ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
    </button>
  );
}
