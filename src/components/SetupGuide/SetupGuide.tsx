import { useId } from 'react';
import {
  baseSettingsTasks,
  postRegistrationCards,
  registrationWorkflowCards,
} from '../../data/content';
import { AccordionSection } from './AccordionSection/AccordionSection';
import { AddWorkflowCard } from './AddWorkflowCard/AddWorkflowCard';
import { StepSection } from './StepSection/StepSection';
import { TaskChip } from './TaskChip/TaskChip';
import { WorkflowCard } from './WorkflowCard/WorkflowCard';
import { useToast } from '../Toast/toastContext';
import './SetupGuide.scss';

/** Displays the attendee setup steps and workflow actions. */
export function SetupGuide() {
  const titleId = useId();
  const showToast = useToast();

  return (
    <section className="setup-guide" aria-labelledby={titleId}>
      <h2 id={titleId} className="setup-guide__title">
        Event setup guide
      </h2>
      <p className="setup-guide__description">
        See the available list of modules below. We suggest that you start with the attendee module.
      </p>

      <AccordionSection title="Attendee">
        <StepSection label="Step 1: Base settings.">
          <ul className="task-chip-grid">
            {baseSettingsTasks.map((task, index) => (
              <TaskChip key={index} {...task} />
            ))}
          </ul>
        </StepSection>

        <StepSection label="Step 2: Build registration workflows.">
          <ul className="workflow-card-grid">
            {registrationWorkflowCards.map((card, index) => (
              <WorkflowCard
                key={index}
                {...card}
                onSelect={() => showToast(`"${card.title}" clicked \u2192 onSelect() fired`)}
              />
            ))}
            <AddWorkflowCard
              description="Add Registration Workflow"
              onAdd={() => showToast('"Add Registration Workflow" clicked \u2192 onAdd() fired')}
            />
          </ul>
        </StepSection>

        <StepSection label="Step 3: Design post-registration experiences.">
          <ul className="workflow-card-grid">
            {postRegistrationCards.map((card, index) => (
              <WorkflowCard
                key={index}
                {...card}
                onSelect={() => showToast(`"${card.title}" clicked \u2192 onSelect() fired`)}
              />
            ))}
          </ul>
        </StepSection>
      </AccordionSection>
    </section>
  );
}
