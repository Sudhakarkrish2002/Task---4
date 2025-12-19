import SectionHeader from '../ui/SectionHeader';
import { SECTION_STACK, WIDE_SECTION_STACK } from '../ui/layoutTokens';

function InstallLibrarySection({
  icon,
  searchQuery,
  onSearchChange,
  filteredLibraries,
  libraryStatus,
  onInstallLibrary,
  isInstalling,
  currentInstall,
  internetStatus,
  customLibrary,
  onCustomLibraryChange,
  onInstallCustomLibrary,
  consoleLogs,
  installMessage,
  onOpenGenerateToken,
  onClearConsole,
}) {
  const hasConsoleLogs = consoleLogs.length > 0;
  const handleClearConsole = () => {
    if (onClearConsole) {
      onClearConsole();
    }
  };

  return (
    <section className={`${WIDE_SECTION_STACK} rounded-3xl border border-slate-800 bg-slate-900/70 p-8`}>
      <SectionHeader
        icon={icon}
        eyebrow="Package Manager"
        title="Install Python Libraries"
        actions={
          <button
            type="button"
            onClick={onOpenGenerateToken}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-200 transition hover:bg-emerald-500/10"
          >
            Generate Token
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5.333 3.2 12 8l-6.667 4.8V3.2z" />
            </svg>
          </button>
        }
      />

      <div>
        <label className="sr-only" htmlFor="library-search">
          Search library
        </label>
        <input
          id="library-search"
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search library here..."
          className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-5 py-3 text-sm text-white outline-none transition focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/30"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className={`${SECTION_STACK} rounded-2xl border border-slate-800 bg-slate-950/70 p-6`}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Available Libraries</h3>
            <span className="text-xs uppercase tracking-[0.35em] text-emerald-300/70">
              {filteredLibraries.length} listed
            </span>
          </div>
          <div className="max-h-80 space-y-2 overflow-y-auto pr-2">
            {filteredLibraries.map((library) => {
              const status = libraryStatus[library.name];
              const isInstalled = status === 'installed';
              const isBusy = isInstalling && currentInstall === library.name;

              return (
                <div
                  key={library.name}
                  className="flex items-center justify-between rounded-xl border border-slate-800/60 bg-slate-900/70 px-4 py-3 text-sm text-slate-200 transition hover:border-emerald-500/40 hover:bg-slate-900"
                >
                  <div>
                    <p className="font-semibold uppercase tracking-wide text-white">{library.name}</p>
                    <p className="mt-1 text-xs text-slate-400">{library.summary}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onInstallLibrary(library)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                      isInstalled ? 'bg-emerald-500/20 text-emerald-300' : 'bg-emerald-500 text-emerald-950 hover:bg-emerald-400'
                    }`}
                    disabled={isInstalled || isBusy}
                  >
                    {isInstalled ? 'Installed' : isBusy ? 'Installing…' : 'Install'}
                  </button>
                </div>
              );
            })}
            {filteredLibraries.length === 0 ? (
              <div className="rounded-xl border border-slate-800/60 bg-slate-900/60 px-4 py-6 text-center text-sm text-slate-400">
                No libraries found. Try another search keyword.
              </div>
            ) : null}
          </div>
        </div>

        <div className={`${SECTION_STACK} rounded-2xl border border-slate-800 bg-slate-950/70 p-6`}>
          <div className="rounded-xl border border-slate-800/80 bg-slate-900/80 px-4 py-3 text-xs uppercase tracking-wide text-slate-200">
            <span>
              Internet Status:{' '}
              <span className={internetStatus.connection === 'Connected' ? 'text-emerald-400' : 'text-rose-400'}>
                {internetStatus.connection}
              </span>
            </span>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wide text-slate-400" htmlFor="custom-library">
              Custom Library
            </label>
            <div className="mt-2 flex gap-3">
              <input
                id="custom-library"
                type="text"
                value={customLibrary}
                onChange={(event) => onCustomLibraryChange(event.target.value)}
                placeholder="Type library here..."
                className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-white outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/30"
              />
              <button
                type="button"
                onClick={onInstallCustomLibrary}
                disabled={!customLibrary.trim() || isInstalling}
                className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-950 shadow-lg shadow-emerald-800/40 transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                aria-label="Install custom Python library"
              >
                {isInstalling && currentInstall === customLibrary.toLowerCase() ? 'Installing...' : 'Install Custom Library'}
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white">Console Output</h3>
            <button
              type="button"
              onClick={handleClearConsole}
              className="text-xs uppercase tracking-wide text-slate-400 transition hover:text-white disabled:cursor-not-allowed disabled:text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
              disabled={!hasConsoleLogs}
              aria-label="Clear console output"
            >
              Clear
            </button>
            </div>
            <div className="mt-3 h-56 overflow-y-auto rounded-xl border border-slate-800 bg-slate-900/70 p-4">
              <pre className="whitespace-pre-wrap text-xs text-slate-300">{consoleLogs.join('\n')}</pre>
            </div>
          </div>

          {isInstalling && currentInstall ? (
            <div className="overflow-hidden rounded-full border border-sky-500/30 bg-slate-900/80">
              <div 
                className="h-2 w-full bg-gradient-to-r from-sky-400 via-sky-500 to-sky-400"
                style={{
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)',
                  backgroundSize: '20px 20px',
                  animation: 'stripes 1s linear infinite'
                }}
              />
            </div>
          ) : null}

          {installMessage ? (
            <div
              className={`text-center text-sm font-semibold ${
                installMessage.type === 'success'
                  ? 'rounded-2xl bg-emerald-500/15 px-4 py-3 text-emerald-200'
                  : installMessage.type === 'error'
                    ? 'rounded-2xl bg-rose-500/15 px-4 py-3 text-rose-200'
                    : 'rounded-2xl bg-sky-500/15 px-4 py-3 text-sky-200'
              }`}
            >
              {installMessage.text}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default InstallLibrarySection;

