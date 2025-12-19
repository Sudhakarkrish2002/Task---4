import Tooltip from './ui/Tooltip';

const tabs = ['Explore', 'About', 'Review'];

const tabTooltips = {
  Explore: 'Discover the robotics ecosystem - Browse sensors, controllers, and actuators',
  About: 'About Robot Studio - Learn about the desktop application',
  Review: 'Learner highlights - See what students are saying',
};

const TopNav = ({ activeTab, onSelect, onMenuToggle, currentView, onNavigatePrevious, onNavigateNext, canNavigatePrevious, canNavigateNext }) => (
  <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 bg-slate-900/70 px-4 py-4 backdrop-blur sm:px-6 md:px-8">
    <div className="flex items-center gap-3">
      {onMenuToggle ? (
        <Tooltip content="Toggle navigation menu (Esc to close)">
          <button
            type="button"
            onClick={onMenuToggle}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 bg-slate-900 text-slate-300 transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 lg:hidden"
            aria-label="Toggle sidebar"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </Tooltip>
      ) : null}
      <div className="flex items-center gap-2">
        {canNavigatePrevious && onNavigatePrevious && (
          <Tooltip content="Go to previous page">
            <button
              type="button"
              onClick={onNavigatePrevious}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/60 bg-slate-800/80 text-slate-300 transition hover:border-emerald-500/60 hover:bg-slate-700/80 hover:text-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
              aria-label="Previous page"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </Tooltip>
        )}
        {canNavigateNext && onNavigateNext && (
          <Tooltip content="Go to next page">
            <button
              type="button"
              onClick={onNavigateNext}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700/60 bg-slate-800/80 text-slate-300 transition hover:border-emerald-500/60 hover:bg-slate-700/80 hover:text-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
              aria-label="Next page"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </Tooltip>
        )}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/70">Robot Studio</p>
        <h2 className="mt-1 text-xl font-semibold text-white">Navigation Hub</h2>
      </div>
    </div>

    <nav className="flex min-w-0 flex-1 items-center justify-end gap-6 overflow-x-auto text-sm font-medium uppercase tracking-wide md:gap-8">
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        const button = (
          <button
            key={tab}
            type="button"
            onClick={() => onSelect(tab)}
            className={`relative whitespace-nowrap pb-1 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 ${
              isActive ? 'text-emerald-300' : 'text-slate-400 hover:text-white'
            }`}
            aria-current={isActive ? 'page' : undefined}
            aria-label={tabTooltips[tab] || tab}
          >
            {tab}
            {isActive ? <span className="absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-emerald-400" /> : null}
          </button>
        );

        return tabTooltips[tab] ? (
          <Tooltip key={tab} content={tabTooltips[tab]} position="bottom">
            {button}
          </Tooltip>
        ) : (
          button
        );
      })}
    </nav>

    <Tooltip content="Login to Robot Studio (Coming soon)">
      <button
        type="button"
        className="hidden rounded-full border border-emerald-400/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-200 transition hover:bg-emerald-500/20 sm:inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
        aria-label="Login"
      >
        Login
      </button>
    </Tooltip>
  </header>
);

export default TopNav;

