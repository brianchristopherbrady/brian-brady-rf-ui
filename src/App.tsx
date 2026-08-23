import { PageHeader } from './components/PageHeader/PageHeader';
import { Sidebar } from './components/Sidebar/Sidebar';
import { SetupGuide } from './components/SetupGuide/SetupGuide';
import { useToast } from './components/Toast/toastContext';
import './App.scss';

/** Name displayed throughout the event interface. */
const EVENT_NAME = 'RainFocus Summit';

/** Date displayed in the event header and sidebar. */
const EVENT_DATE = 'December 15th';

const EVENT_LOCATION = 'Lehi, UT';

const USER_INITIALS = 'FL';

/** Renders the complete event setup experience. */
function App() {
  const showToast = useToast();

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="app">
        <Sidebar eventName={EVENT_NAME} location={EVENT_LOCATION} date={EVENT_DATE} userInitials={USER_INITIALS} />
        <main id="main-content" className="app__main">
          <PageHeader
            title={EVENT_NAME}
            date={EVENT_DATE}
            location={EVENT_LOCATION}
            onEditEvent={() => showToast('"Edit event" clicked \u2192 onEditEvent() fired')}
          />
          <SetupGuide />
        </main>
      </div>
    </>
  );
}

export default App;
