import type { ReactNode } from 'react';
import './StepSection.scss';

/** Props for a labelled setup step. */
interface StepSectionProps {
  label: string;
  children: ReactNode;
}

/** Groups the content for one setup step. */
export function StepSection({ label, children }: StepSectionProps) {
  return (
    <div className="step-section">
      <h4 className="step-section__label">{label}</h4>
      {children}
    </div>
  );
}
