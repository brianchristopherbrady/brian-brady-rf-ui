import { useEffect, useState } from 'react';
import './ThemeSwitcher.scss';

type Theme = 'light' | 'dark' | 'bad-nineties';

const themeOptions: { label: string; value: Theme }[] = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: '90s', value: 'bad-nineties' },
];

function isTheme(value: string | null): value is Theme {
  return themeOptions.some((option) => option.value === value);
}

/** Selects and persists the application's visual theme. */
export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('rainfocus-theme');
    return isTheme(savedTheme) ? savedTheme : 'light';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('rainfocus-theme', theme);
  }, [theme]);

  return (
    <fieldset className="theme-switcher">
      <legend className="theme-switcher__legend">Theme</legend>
      <div className="theme-switcher__options">
        {themeOptions.map((option) => (
          <label className="theme-switcher__option" key={option.value}>
            <input
              type="radio"
              name="theme"
              value={option.value}
              checked={theme === option.value}
              onChange={() => setTheme(option.value)}
            />
            <span className="theme-switcher__control">
              <span
                className={`theme-switcher__swatch theme-switcher__swatch--${option.value}`}
                aria-hidden="true"
              />
              {option.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}