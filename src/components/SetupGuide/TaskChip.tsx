import type { TaskChip as TaskChipData } from '../../data/content';
import './TaskChip.scss';

/** displays a setup task title and description */
export function TaskChip({ title, description }: TaskChipData) {
  return (
    <li className="task-chip">
      <p className="task-chip__title">{title}</p>
      <p className="task-chip__description">{description}</p>
    </li>
  );
}
