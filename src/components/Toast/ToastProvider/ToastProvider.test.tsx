import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useToast } from '../toastContext';
import { ToastProvider } from './ToastProvider';

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

function ToastTrigger() {
  const showToast = useToast();

  return (
    <button type="button" onClick={() => showToast('Event updated')}>
      Show notification
    </button>
  );
}

describe('ToastProvider', () => {
  it('keeps polite status messages available until the user dismisses them', async () => {
    vi.useFakeTimers();
    render(
      <ToastProvider>
        <ToastTrigger />
      </ToastProvider>,
    );

    const trigger = screen.getByRole('button', { name: 'Show notification' });
    trigger.focus();
    fireEvent.click(trigger);
    fireEvent.click(trigger);

    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveTextContent('Event updated');

    act(() => vi.advanceTimersByTime(3000));
    expect(status).toHaveTextContent('Event updated');

    vi.useRealTimers();
    const user = userEvent.setup();
    const [firstDismissButton, secondDismissButton] = screen.getAllByRole('button', {
      name: 'Dismiss notification: Event updated',
    });
    firstDismissButton.focus();
    expect(firstDismissButton).toHaveFocus();
    await user.keyboard('{Enter}');

    expect(firstDismissButton).not.toBeInTheDocument();
    expect(secondDismissButton).toHaveFocus();

    await user.keyboard('{Enter}');

    expect(status).not.toHaveTextContent('Event updated');
    expect(trigger).toHaveFocus();
  });
});