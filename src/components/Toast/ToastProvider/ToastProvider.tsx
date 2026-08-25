import { X } from 'lucide-react';
import { useCallback, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { ToastContext, type ShowToast } from '../toastContext';
import './Toast.scss';

/** A toast notification queued for display. */
interface ToastMessage {
  id: number;
  text: string;
  trigger: HTMLElement | null;
}

/** Provides toast state and renders active notifications. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const nextId = useRef(0);
  const dismissButtons = useRef(new Map<number, HTMLButtonElement>());
  const pendingFocus = useRef<{ nextToastId?: number; trigger: HTMLElement | null } | undefined>(undefined);

  const showToast = useCallback<ShowToast>((text) => {
    const id = nextId.current++;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setToasts((current) => [...current, { id, text, trigger }]);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => {
      const dismissedIndex = current.findIndex((toast) => toast.id === id);
      const dismissedToast = current[dismissedIndex];
      const remaining = current.filter((toast) => toast.id !== id);
      pendingFocus.current = {
        nextToastId: remaining[dismissedIndex]?.id ?? remaining[dismissedIndex - 1]?.id,
        trigger: dismissedToast?.trigger ?? null,
      };
      return remaining;
    });
  }, []);

  useLayoutEffect(() => {
    const target = pendingFocus.current;
    if (!target) return;

    pendingFocus.current = undefined;
    const nextDismissButton = target.nextToastId === undefined
      ? undefined
      : dismissButtons.current.get(target.nextToastId);
    if (nextDismissButton) nextDismissButton.focus();
    else if (target.trigger?.isConnected) target.trigger.focus();
  }, [toasts]);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="toast-viewport" role="status" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast">
            <p className="toast__message">{toast.text}</p>
            <button
              ref={(button) => {
                if (button) dismissButtons.current.set(toast.id, button);
                else dismissButtons.current.delete(toast.id);
              }}
              type="button"
              className="toast__dismiss"
              aria-label={`Dismiss notification: ${toast.text}`}
              title="Dismiss notification"
              onClick={() => dismissToast(toast.id)}
            >
              <X size={16} aria-hidden="true" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
