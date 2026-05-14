import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type Mode = 'dark' | 'light';
interface ThemeContextType { mode: Mode; toggle: () => void; isDark: boolean; }

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitial(): Mode {
  if (typeof window === 'undefined') return 'dark';
  const saved = localStorage.getItem('lowkey-theme') as Mode;
  if (saved) {
    if (saved === 'light') document.documentElement.classList.add('light');
    return saved;
  }
  return 'dark';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>(getInitial);

  const toggle = useCallback(() => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      // Instant DOM update — no React re-render delay
      if (next === 'light') {
        document.documentElement.classList.add('light');
      } else {
        document.documentElement.classList.remove('light');
      }
      localStorage.setItem('lowkey-theme', next);
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ mode, toggle, isDark: mode === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
