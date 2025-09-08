"use client";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
     style={{ padding: '10px', background: 'transparent', border: 'none', cursor: 'pointer' }}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <i className="fa-solid fa-sun" style={{ color: '#333'  }}></i>
      ) : (
        <i className="fa-solid fa-moon" style={{ color: '#333' }}></i>
      )}
    </button>
  );
}
