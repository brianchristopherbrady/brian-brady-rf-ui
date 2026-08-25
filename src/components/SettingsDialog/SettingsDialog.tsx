import { useEffect, useState, type RefObject } from 'react';
import { X } from 'lucide-react';
import {
  DENSITY_STORAGE_KEY,
  THEME_STORAGE_KEY,
  applyPreferences,
  getStoredDensity,
  getStoredTheme,
  type Density,
  type Theme,
} from '../../preferences';
import './SettingsDialog.scss';

interface SettingsDialogProps {
  dialogRef: RefObject<HTMLDialogElement | null>;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

const themeOptions: { label: string; value: Theme }[] = [
  { label: 'Light', value: 'light' },
  { label: 'Dark', value: 'dark' },
  { label: '90s', value: 'bad-nineties' },
];

const densityOptions: { label: string; value: Density }[] = [
  { label: 'Cozy', value: 'cozy' },
  { label: 'Default', value: 'default' },
  { label: 'Compact', value: 'compact' },
];

/** Provides persisted appearance and spacing preferences. */
export function SettingsDialog({ dialogRef, triggerRef }: SettingsDialogProps) {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);
  const [density, setDensity] = useState<Density>(getStoredDensity);

  useEffect(() => {
    applyPreferences(theme, density);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    localStorage.setItem(DENSITY_STORAGE_KEY, density);
  }, [theme, density]);

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      className="settings-dialog"
      aria-labelledby="settings-title"
      onClose={() => setTimeout(() => triggerRef.current?.focus())}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          closeDialog();
        }
      }}
      onMouseDown={(event) => event.target === event.currentTarget && closeDialog()}
    >
      <div className="settings-dialog__panel">
        <header className="settings-dialog__header">
          <h2 id="settings-title">Settings</h2>
          <button
            type="button"
            className="settings-dialog__close"
            aria-label="Close settings"
            title="Close settings"
            onClick={closeDialog}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        <div className="settings-dialog__body">
          <fieldset className="settings-dialog__group">
            <legend>Theme</legend>
            <div className="settings-dialog__options">
              {themeOptions.map((option) => (
                <label className="settings-dialog__option" key={option.value}>
                  <input
                    type="radio"
                    name="theme"
                    value={option.value}
                    checked={theme === option.value}
                    onChange={() => setTheme(option.value)}
                  />
                  <span className="settings-dialog__control">
                    <span
                      className={`settings-dialog__swatch settings-dialog__swatch--${option.value}`}
                      aria-hidden="true"
                    />
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="settings-dialog__group">
            <legend>Density</legend>
            <div className="settings-dialog__options">
              {densityOptions.map((option) => (
                <label className="settings-dialog__option" key={option.value}>
                  <input
                    type="radio"
                    name="density"
                    value={option.value}
                    checked={density === option.value}
                    onChange={() => setDensity(option.value)}
                  />
                  <span className="settings-dialog__control">{option.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>
    </dialog>
  );
}