import { useRef } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import logoMark from '../../../assets/icons/logo-rainfocus-mark.svg';
import orgLogo from '../../../assets/images/event-logo.png';
import { SettingsDialog } from '../../SettingsDialog/SettingsDialog';
import './IconRail.scss';

/** Props for the sidebar icon rail. */
interface IconRailProps {
  userInitials: string;
}

/** Displays brand, organization, and account controls. */
export function IconRail({ userInitials }: IconRailProps) {
  const settingsDialogRef = useRef<HTMLDialogElement>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);

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
      <div className="icon-rail__group icon-rail__group--bottom">
        <button
          ref={settingsButtonRef}
          type="button"
          className="icon-rail__button"
          aria-label="Settings"
          title="Settings"
          onClick={() => settingsDialogRef.current?.showModal()}
        >
          <SettingsIcon size={22} aria-hidden="true" />
        </button>
        <button type="button" className="icon-rail__button icon-rail__button--avatar" aria-label="Account menu">
          {userInitials}
        </button>
      </div>
      <SettingsDialog dialogRef={settingsDialogRef} triggerRef={settingsButtonRef} />
    </div>
  );
}
