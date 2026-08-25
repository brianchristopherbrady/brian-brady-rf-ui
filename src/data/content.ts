/** Link nested under a top-level navigation item. */
export interface NavSubItem {
  label: string;
}

/** Top-level event navigation item. */
export interface NavItem {
  label: string;
  active?: boolean;
  subItems?: NavSubItem[];
}

/** Navigation groups displayed in the event sidebar. */
export const navItems: NavItem[] = [
  {
    label: 'Guide',
    subItems: [
      { label: 'Overview' },
      { label: 'Getting started' },
      { label: 'Resources' },
    ],
  },
  {
    label: 'Attendees',
    active: true,
    subItems: [
      { label: 'Attendees' },
      { label: 'Attendee types' },
      { label: 'Packages' },
      { label: 'Reg codes' },
      { label: 'Discounts' },
    ],
  },
  {
    label: 'Content',
    subItems: [
      { label: 'Sessions' },
      { label: 'Speakers' },
      { label: 'Tracks' },
    ],
  },
  {
    label: 'Exhibitors',
    subItems: [
      { label: 'Directory' },
      { label: 'Booths' },
      { label: 'Leads' },
    ],
  },
];

/** Content displayed in a base-settings task chip. */
export interface TaskChip {
  title: string;
  description: string;
}

/** Base settings tasks displayed in the first setup step. */
export const baseSettingsTasks: TaskChip[] = [
  { title: 'General', description: 'Define Attendee types & attributes' },
  {
    title: 'Attendee types',
    description: 'Define attendee categories and the information collected for each.',
  },
  {
    title: 'Packages',
    description: 'Group registration options, pricing, and attendee benefits.',
  },
];

/** Content and icon selection for a workflow card. */
export interface WorkflowCard {
  icon: 'logic-arrow' | 'computer';
  title: string;
  description: string;
}

/** Registration workflows displayed in the second setup step. */
export const registrationWorkflowCards: WorkflowCard[] = [
  { icon: 'logic-arrow', title: 'Attendee Registration', description: 'Start by creating a general registration workflow' },
  { icon: 'logic-arrow', title: 'VIP Registration', description: 'Create a tailored registration workflow for VIP guests' },
  { icon: 'logic-arrow', title: 'Staff Registration', description: 'Configure registration for event staff and volunteers' },
];

/** Post-registration experiences displayed in the third setup step. */
export const postRegistrationCards: WorkflowCard[] = [
  {
    icon: 'computer',
    title: 'Attendee Portal',
    description: 'Manage the portal that attendees will see after they\u2019ve registered for your event.',
  },
];
