import { useCallback, useRef, useState, type ReactNode } from 'react';
import { ToastContext, type ShowToast } from './toastContext';
import './Toast.scss';

/** A toast notification queued for display. */
interface ToastMessage {
  id: number;
  text: string;
}

/** time a toast remains visible before dismissal. */
const TOAST_DURATION_MS = 3000;

/** provides toast state and renders active notifications. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const nextId = useRef(0);

  const showToast = useCallback<ShowToast>((text) => {
    const id = nextId.current++;
    setToasts((current) => [...current, { id, text }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, TOAST_DURATION_MS);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="toast-viewport" role="status" aria-live="polite">
        {toasts.map((toast) => (
          <p key={toast.id} className="toast">
            {toast.text}
          </p>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
