import { useId, useState } from 'react';
import { Button } from '../Button/Button';
import { IconRail } from './IconRail/IconRail';
import { SidebarPanel } from './SidebarPanel/SidebarPanel';
import './Sidebar.scss';

/** Props for the responsive event sidebar. */
interface SidebarProps {
  eventName: string;
  location: string;
  date: string;
  userInitials: string;
}

/** Displays the icon rail and collapsible event navigation panel. */
export function Sidebar({ eventName, location, date, userInitials }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <aside className="sidebar">
      <div className="sidebar__bar">
        <IconRail userInitials={userInitials} />
        <Button
          variant="secondary"
          className="sidebar__toggle"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((open) => !open)}
        >
          {isOpen ? 'Close menu' : 'Menu'}
        </Button>
      </div>
      <div id={panelId} className={`sidebar__panel-wrap${isOpen ? ' sidebar__panel-wrap--open' : ''}`}>
        <SidebarPanel eventName={eventName} location={location} date={date} />
      </div>
    </aside>
  );
}
