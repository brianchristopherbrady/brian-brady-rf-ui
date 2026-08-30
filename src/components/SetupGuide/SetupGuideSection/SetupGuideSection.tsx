import { useId, type ReactNode } from 'react';
import personPortalIcon from '../../../assets/icons/icon-person-portal.svg';
import './SetupGuideSection.scss';

/** Props for a setup guide section. */
interface SetupGuideSectionProps {
  title: string;
  children: ReactNode;
}

/** Groups related setup steps under a labelled section. */
export function SetupGuideSection({ title, children }: SetupGuideSectionProps) {
  const titleId = useId();

  return (
    <section className="setup-guide-section" aria-labelledby={titleId}>
      <div className="setup-guide-section__header">
        <img src={personPortalIcon} alt="" className="setup-guide-section__icon" width={35} height={35} />
        <h3 id={titleId} className="setup-guide-section__title">
          {title}
        </h3>
      </div>
      <div className="setup-guide-section__steps">{children}</div>
    </section>
  );
}