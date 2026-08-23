import eventLogo from '../../assets/images/event-logo.png';
import './PageHeader.scss';

/** propps for the event page header. */
interface PageHeaderProps {
  title: string;
  date: string;
  location: string;
  onEditEvent?: () => void;
}

/** displays the event identity, metadata, and edit action. */
export function PageHeader({ title, date, location, onEditEvent }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="page-header__identity-group">
        <img className="page-header__logo" src={eventLogo} alt={`${title} event logo`} width={95} height={95} />
        <div className="page-header__identity">
          <h1 className="page-header__title">{title}</h1>
          <p className="page-header__meta">
            {date}
            <br />
            {location}
          </p>
        </div>
      </div>
      <button type="button" className="button button--primary page-header__action" onClick={onEditEvent}>
        Edit event
      </button>
    </header>
  );
}
