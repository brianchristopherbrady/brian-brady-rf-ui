import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

afterEach(cleanup);

describe('Button', () => {
  it.each(['primary', 'secondary'] as const)('renders the %s variant', (variant) => {
    render(<Button variant={variant}>{variant}</Button>);

    const button = screen.getByRole('button', { name: variant });
    expect(button).toHaveClass('button', `button--${variant}`);
    expect(button).toHaveAttribute('type', 'button');
  });

  it('forwards native props and preserves custom classes', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(
      <Button className="custom-action" aria-expanded="false" onClick={onClick}>
        Menu
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Menu' });
    expect(button).toHaveClass('button--secondary', 'custom-action');
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });
});
