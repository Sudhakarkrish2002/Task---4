const navIcons = {
  Home: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="M3 10.5 12 4l9 6.5v8.5a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 19V10.5z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9 21V13h6v8" />
    </svg>
  ),
  'Code Lab': (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="m7.5 8.5 4.5-4.5 4.5 4.5m0 7-4.5 4.5-4.5-4.5"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="m4 12 16-.05" />
    </svg>
  ),
  Modules: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="M5 7h4v4H5zM5 13h4v4H5zM11 7h8M11 13h8M11 17h8"
      />
    </svg>
  ),
  'Control-Based Robot': (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="7.5" cy="16.5" r="2.5" strokeWidth="1.6" />
      <circle cx="16.5" cy="7.5" r="2.5" strokeWidth="1.6" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="m9.4 14.6 5.2-5.2M7.5 5v3m0 14v-3m-4.5-3h3M3 7.5h3"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M16.5 3v3m0 14v-3M19 16.5h3M19 7.5h3" />
    </svg>
  ),
  Tutorials: (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="M5 4h9l5 5v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9 4v5h7" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="m9 15 2 2 4-4" />
    </svg>
  ),
  'Share Your Feedback': (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="M5 4h14a1 1 0 0 1 1 1v11.5a1 1 0 0 1-1 1H9.75L6 21v-3.5H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M8 9h8M8 12h5" />
    </svg>
  ),
  'Install Library': (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="M6 20h12a2 2 0 0 0 2-2v-4"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="M18 8 12 14 6 8"
      />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M12 4v10" />
    </svg>
  ),
};

import Tooltip from './ui/Tooltip';

const tooltipMap = {
  Home: 'Go to home page - View quick launch options and recent activity',
  'Code Lab': 'Open code lab - Start programming and running code',
  Modules: 'Browse learning modules - Explore robotics projects',
  'Control-Based Robot': 'Control-based robot - Configure PID loops and state machines',
  Tutorials: 'Tutorial library - Access guided lessons',
  'Share Your Feedback': 'Share feedback - Help improve Robot Studio',
  'Install Library': 'Install Python libraries - Manage package dependencies',
};

const Sidebar = ({ items, activeItem, onSelect, className = '', heading = 'Navigation' }) => (
  <aside
    className={`w-full max-w-[240px] rounded-2xl border border-slate-800 bg-slate-950/70 p-4 shadow-lg shadow-slate-950/40 transition ${className}`}
  >
    {heading ? (
      <p className="px-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{heading}</p>
    ) : null}
    <nav aria-label={heading || 'Navigation'} className="mt-4 space-y-1">
      {items.map((item) => {
        const isActive = activeItem === item;
        const buttonContent = (
          <button
            key={item}
            type="button"
            onClick={() => onSelect(item)}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${
              isActive
                ? 'bg-emerald-500/25 text-emerald-200 ring-1 ring-inset ring-emerald-500/60'
                : 'text-slate-300 hover:bg-slate-900/80 hover:text-white'
            }`}
            aria-current={isActive ? 'page' : undefined}
            aria-label={tooltipMap[item] || item}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900/70 text-slate-400">
              {navIcons[item]}
            </span>
            <span>{item}</span>
          </button>
        );

        return tooltipMap[item] ? (
          <Tooltip key={item} content={tooltipMap[item]} position="right">
            <div className="w-full">{buttonContent}</div>
          </Tooltip>
        ) : (
          <div key={item}>{buttonContent}</div>
        );
      })}
    </nav>
  </aside>
);

export default Sidebar;

