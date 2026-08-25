import type { ButtonHTMLAttributes } from 'react';
import './Button.scss';

export type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

/** Shared command button for primary and secondary actions. */
export function Button({ variant = 'secondary', className, type = 'button', ...props }: ButtonProps) {
  const classes = ['button', `button--${variant}`, className].filter(Boolean).join(' ');

  return <button type={type} className={classes} {...props} />;
}
