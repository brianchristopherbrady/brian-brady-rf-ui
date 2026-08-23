import searchIcon from '../../assets/icons/icon-search.svg';
import { navItems } from '../../data/content';
import { MegaNav } from './MegaNav';
import './SidebarPanel.scss';

/** props for the expanded sidebar panel */
interface SidebarPanelProps {
  eventName: string;
  location: string;
  date: string;
}

/** displays search, and navigation */
export function SidebarPanel({ eventName, location, date }: SidebarPanelProps) {
  return (
    <div className="sidebar-panel">
      <p className="sidebar-panel__event-name">{eventName}</p>
      <p className="sidebar-panel__meta">
        {location} <span aria-hidden="true">&bull;</span> {date}
      </p>
      <form className="sidebar-panel__search" role="search" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor="event-search" className="sidebar-panel__search-label">
          Search this event
        </label>
        <img src={searchIcon} alt="" className="sidebar-panel__search-icon" />
        <input id="event-search" type="search" placeholder="Search" />
      </form>
      <MegaNav navigationItems={navItems} expandMode="single" />
    </div>
  );
}
