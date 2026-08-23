/** link nested under a top-level navigation item. */
export interface NavSubItem {
  label: string;
}

/** top-level event navigation item. */
export interface NavItem {
  label: string;
  active?: boolean;
  subItems?: NavSubItem[];
}

/** navigation groups displayed in the event sidebar. */
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

/** content displayed in a base-settings task chip. */
export interface TaskChip {
  title: string;
  description: string;
}

/** base settings tasks displayed in the first setup step. */
export const baseSettingsTasks: TaskChip[] = [
  { title: 'General', description: 'Define Attendee types & attributes' },
  {
    title: 'Title',
    description: 'Description that explains the value goes here. Description that explains the value goes here.',
  },
  {
    title: 'Title',
    description: 'Description that explains the value goes here. Description that explains the value goes here.',
  },
];

/** content and icon selection for a workflow card. */
export interface WorkflowCard {
  icon: 'logic-arrow' | 'computer';
  title: string;
  description: string;
}

/** registration workflows displayed in the second setup step. */
export const registrationWorkflowCards: WorkflowCard[] = [
  { icon: 'logic-arrow', title: 'Attendee Registration', description: 'Start by creating a general registration workflow' },
  { icon: 'logic-arrow', title: 'Attendee Registration', description: 'Start by creating a general registration workflow' },
  { icon: 'logic-arrow', title: 'Attendee Registration', description: 'Start by creating a general registration workflow' },
];

/** post-registration experiences displayed in the third setup step */
export const postRegistrationCards: WorkflowCard[] = [
  {
    icon: 'computer',
    title: 'Attendee Portal',
    description: 'Manage the portal that attendees will see after they\u2019ve register for your event.',
  },
];
