import { useId, type ReactNode } from 'react';
import personPortalIcon from '../../assets/icons/icon-person-portal.svg';
import './AccordionSection.scss';

/** props for a setup guide section. */
interface AccordionSectionProps {
  title: string;
  children: ReactNode;
}

/** groups related setup steps under a labelled section. */
export function AccordionSection({ title, children }: AccordionSectionProps) {
  const titleId = useId();

  return (
    <section className="accordion-section" aria-labelledby={titleId}>
      <div className="accordion-section__header">
        <img src={personPortalIcon} alt="" className="accordion-section__icon" width={35} height={35} />
        <h3 id={titleId} className="accordion-section__title">
          {title}
        </h3>
      </div>
      <div className="accordion-section__steps">{children}</div>
    </section>
  );
}
