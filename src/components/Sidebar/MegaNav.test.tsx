import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { NavItem } from '../../data/content';
import { MegaNav } from './MegaNav';

const navigationItems: NavItem[] = [
  { label: 'Attendees', active: true, subItems: [{ label: 'Directory' }] },
  { label: 'Content', subItems: [{ label: 'Sessions' }] },
];

afterEach(cleanup);

describe('MegaNav', () => {
  it('keeps only one group open in single mode', async () => {
    const user = userEvent.setup();
    render(<MegaNav navigationItems={navigationItems} expandMode="single" />);

    const attendees = screen.getByRole('button', { name: 'Attendees' });
    const content = screen.getByRole('button', { name: 'Content' });
    await user.click(content);

    expect(attendees.getAttribute('aria-expanded')).toBe('false');
    expect(content.getAttribute('aria-expanded')).toBe('true');
  });

  it('keeps existing groups open in multi mode', async () => {
    const user = userEvent.setup();
    render(<MegaNav navigationItems={navigationItems} expandMode="multi" />);

    const attendees = screen.getByRole('button', { name: 'Attendees' });
    const content = screen.getByRole('button', { name: 'Content' });
    await user.click(content);

    expect(attendees.getAttribute('aria-expanded')).toBe('true');
    expect(content.getAttribute('aria-expanded')).toBe('true');
  });
});