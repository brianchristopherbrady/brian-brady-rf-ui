import type { ReactNode } from 'react';
import './StepSection.scss';

/** props for a labelled setup step */
interface StepSectionProps {
  label: string;
  children: ReactNode;
}

/** groups the content for one setup step. */
export function StepSection({ label, children }: StepSectionProps) {
  return (
    <div className="step-section">
      <h4 className="step-section__label">{label}</h4>
      {children}
    </div>
  );
}
