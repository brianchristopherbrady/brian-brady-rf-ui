import addCircleIcon from '../../assets/icons/icon-add-circle.svg';
import './WorkflowCard.scss';

/** props for the add-workflow action card. */
interface AddWorkflowCardProps {
  description: string;
  onAdd?: () => void;
}

/** displays a card button for creating a registration workflow. */
export function AddWorkflowCard({ description, onAdd }: AddWorkflowCardProps) {
  return (
    <li className="workflow-card">
      <button type="button" className="workflow-card__button workflow-card__button--cta" onClick={onAdd}>
        <span className="workflow-card__header">
          <img src={addCircleIcon} alt="" className="workflow-card__icon" />
        </span>
        <span className="workflow-card__description">{description}</span>
      </button>
    </li>
  );
}
