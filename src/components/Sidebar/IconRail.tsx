import logoMark from '../../assets/icons/logo-rainfocus-mark.svg';
import orgLogo from '../../assets/images/event-logo.png';
import './IconRail.scss';

/** props for the sidebar icon rail. */
interface IconRailProps {
  userInitials: string;
}

/** displays brand, organization, and account controls. */
export function IconRail({ userInitials }: IconRailProps) {
  return (
    <div className="icon-rail">
      <div className="icon-rail__group">
        <a className="icon-rail__button icon-rail__button--brand" href="/" aria-label="RainFocus home">
          <img src={logoMark} alt="" width={32} height={32} />
        </a>
        <button type="button" className="icon-rail__button" aria-label="Organization settings">
          <img src={orgLogo} alt="" className="icon-rail__org-icon" width={32} height={32} />
        </button>
      </div>
      <button type="button" className="icon-rail__button icon-rail__button--avatar" aria-label="Account menu">
        {userInitials}
      </button>
    </div>
  );
}
