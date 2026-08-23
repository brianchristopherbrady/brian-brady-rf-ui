import { createContext, useContext } from 'react';

/** Function used to display a toast message. */
export type ShowToast = (text: string) => void;

/** Provides the toast display function to descendant components. */
export const ToastContext = createContext<ShowToast | null>(null);

/** Returns the toast display function from the nearest provider. */
export function useToast(): ShowToast {
  const showToast = useContext(ToastContext);
  if (!showToast) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return showToast;
}
