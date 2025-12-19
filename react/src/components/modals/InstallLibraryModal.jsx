import { useEffect, useRef } from 'react';
import { BODY_TEXT, SECTION_STACK, WIDE_SECTION_STACK } from '../ui/layoutTokens';

function InstallLibraryModal({
  requiredLibraries,
  libraryStatus,
  onInstallLibrary,
  isInstalling,
  currentInstall,
  installMessage,
  searchQuery,
  onSearchChange,
  filteredLibraries,
  customLibrary,
  onCustomLibraryChange,
  onInstallCustomLibrary,
  consoleLogs,
  internetStatus,
  onClearConsole,
  onClose,
}) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  // Focus trap and keyboard handling
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    // Focus the modal when it opens
    const firstFocusable = modal.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 100);
    }

    // Handle Escape key
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Handle Tab key for focus trap
    const handleTab = (event) => {
      const focusableElements = modal.querySelectorAll(
        'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    modal.addEventListener('keydown', handleTab);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      modal.removeEventListener('keydown', handleTab);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-library-modal-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-4xl rounded-3xl border border-emerald-500/30 bg-slate-900/95 p-8 shadow-2xl shadow-emerald-900/40 animate-fade-in"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-slate-700/60 bg-slate-800/80 text-xl leading-none text-slate-400 transition hover:border-slate-500/80 hover:bg-slate-700/80 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
          aria-label="Close install library modal (Esc)"
        >
          ×
        </button>
        <div className={WIDE_SECTION_STACK}>
          <header className="space-y-2 text-center lg:text-left">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/70">Package Manager</p>
            <h3 id="install-library-modal-title" className="text-2xl font-semibold text-white">
              Install Python Libraries
            </h3>
            <p className={BODY_TEXT}>
              Install and manage Python packages required for your robotics projects.
            </p>
          </header>

          <div>
            <label className="sr-only" htmlFor="library-search-modal">
              Search library
            </label>
            <input
              id="library-search-modal"
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
                <h4 className="text-lg font-semibold text-white">Available Libraries</h4>
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
                <label className="text-xs uppercase tracking-wide text-slate-400" htmlFor="custom-library-modal">
                  Custom Library
                </label>
                <div className="mt-2 flex gap-3">
                  <input
                    id="custom-library-modal"
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
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-white">Console Output</h4>
                  <button
                    type="button"
                    onClick={onClearConsole}
                    className="text-xs uppercase tracking-wide text-slate-400 transition hover:text-white disabled:cursor-not-allowed disabled:text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
                    disabled={consoleLogs.length <= 1}
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
        </div>
      </div>
    </div>
  );
}

export default InstallLibraryModal;
