import type { WorkflowCard as WorkflowCardData } from '../../../data/content';
import { workflowIcons } from '../icons';
import './WorkflowCard.scss';

/** Props for an interactive workflow card. */
interface WorkflowCardProps extends WorkflowCardData {
  onSelect?: () => void;
}

/** Displays a selectable workflow with its icon and description. */
export function WorkflowCard({ icon, title, description, onSelect }: WorkflowCardProps) {
  return (
    <li className="workflow-card">
      <button type="button" className="workflow-card__button" onClick={onSelect}>
        <span className="workflow-card__header">
          <img src={workflowIcons[icon]} alt="" className="workflow-card__icon" />
          <span className="workflow-card__title">{title}</span>
        </span>
        <span className="workflow-card__description">{description}</span>
      </button>
    </li>
  );
}
