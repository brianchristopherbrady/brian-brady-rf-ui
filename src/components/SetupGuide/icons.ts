import iconLogicArrow from '../../assets/icons/icon-logic-arrow.svg';
import iconComputer from '../../assets/icons/icon-computer.svg';

/** Maps workflow icon names to their asset paths. */
export const workflowIcons = {
  'logic-arrow': iconLogicArrow,
  computer: iconComputer,
} as const;

/** Name of an icon available to workflow cards. */
export type WorkflowIconName = keyof typeof workflowIcons;
