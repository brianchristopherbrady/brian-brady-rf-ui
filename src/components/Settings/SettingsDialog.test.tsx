import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { IconRail } from '../Sidebar/IconRail';

afterEach(() => {
  cleanup();
  localStorage.clear();
  delete document.documentElement.dataset.theme;
  delete document.documentElement.dataset.density;
});

describe('SettingsDialog', () => {
  it('persists preferences and restores focus when closed', async () => {
    const user = userEvent.setup();
    render(<IconRail userInitials="FL" />);

    const settingsButton = screen.getByRole('button', { name: 'Settings' });
    await user.click(settingsButton);
    await user.click(screen.getByRole('radio', { name: 'Dark' }));
    await user.click(screen.getByRole('radio', { name: 'Compact' }));

    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(document.documentElement.dataset.density).toBe('compact');
    expect(localStorage.getItem('rainfocus-theme')).toBe('dark');
    expect(localStorage.getItem('rainfocus-density')).toBe('compact');

    await user.click(screen.getByRole('button', { name: 'Close settings' }));

    expect(document.activeElement).toBe(settingsButton);
  });
});