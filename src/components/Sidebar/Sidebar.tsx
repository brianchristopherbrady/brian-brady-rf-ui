import { useId, useState } from 'react';
import { IconRail } from './IconRail';
import { SidebarPanel } from './SidebarPanel';
import './Sidebar.scss';

/** props for the responsive event sidebar */
interface SidebarProps {
  eventName: string;
  location: string;
  date: string;
  userInitials: string;
}

/** displays the icon rail and collapsible event navigation panel */
export function Sidebar({ eventName, location, date, userInitials }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <aside className="sidebar">
      <div className="sidebar__bar">
        <IconRail userInitials={userInitials} />
        <button
          type="button"
          className="sidebar__toggle"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? 'Close menu' : 'Menu'}
        </button>
      </div>
      <div id={panelId} className={`sidebar__panel-wrap${isOpen ? ' sidebar__panel-wrap--open' : ''}`}>
        <SidebarPanel eventName={eventName} location={location} date={date} />
      </div>
    </aside>
  );
}
