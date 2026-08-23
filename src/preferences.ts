export type Theme = 'light' | 'dark' | 'bad-nineties';
export type Density = 'cozy' | 'default' | 'compact';

export const THEME_STORAGE_KEY = 'rainfocus-theme';
export const DENSITY_STORAGE_KEY = 'rainfocus-density';

const themes: Theme[] = ['light', 'dark', 'bad-nineties'];
const densities: Density[] = ['cozy', 'default', 'compact'];

function isTheme(value: string | null): value is Theme {
  return themes.some((theme) => theme === value);
}

function isDensity(value: string | null): value is Density {
  return densities.some((density) => density === value);
}

export function getStoredTheme(): Theme {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  return isTheme(savedTheme) ? savedTheme : 'light';
}

export function getStoredDensity(): Density {
  const savedDensity = localStorage.getItem(DENSITY_STORAGE_KEY);
  return isDensity(savedDensity) ? savedDensity : 'default';
}

export function applyPreferences(theme: Theme, density: Density) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.dataset.density = density;
}

export function applyStoredPreferences() {
  applyPreferences(getStoredTheme(), getStoredDensity());
}