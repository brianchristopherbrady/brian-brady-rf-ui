import { useEffect, useState, type RefObject } from 'react';
import { X } from 'lucide-react';
import './SettingsDialog.scss';

type Theme = 'light' | 'dark' | 'bad-nineties';
type Density = 'cozy' | 'default' | 'compact';

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

function isTheme(value: string | null): value is Theme {
  return themeOptions.some((option) => option.value === value);
}

function isDensity(value: string | null): value is Density {
  return densityOptions.some((option) => option.value === value);
}

/** Provides persisted appearance and spacing preferences. */
export function SettingsDialog({ dialogRef, triggerRef }: SettingsDialogProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('rainfocus-theme');
    return isTheme(savedTheme) ? savedTheme : 'light';
  });
  const [density, setDensity] = useState<Density>(() => {
    const savedDensity = localStorage.getItem('rainfocus-density');
    return isDensity(savedDensity) ? savedDensity : 'default';
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('rainfocus-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.density = density;
    localStorage.setItem('rainfocus-density', density);
  }, [density]);

  function closeDialog() {
    dialogRef.current?.close();
    triggerRef.current?.focus();
  }

  return (
    <dialog
      ref={dialogRef}
      className="settings-dialog"
      aria-labelledby="settings-title"
      onCancel={(event) => {
        event.preventDefault();
        closeDialog();
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