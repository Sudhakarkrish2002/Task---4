import { useEffect, useRef } from 'react';
import { BODY_TEXT, SECTION_STACK, WIDE_SECTION_STACK } from '../ui/layoutTokens';

function UtilitiesModal({
  requiredLibraries,
  libraryStatus,
  onInstallLibrary,
  isInstalling,
  currentInstall,
  installMessage,
  networkName,
  onNetworkNameChange,
  networkPassword,
  onNetworkPasswordChange,
  onGenerateToken,
  generatedToken,
  onCopyToken,
  isTokenCopied,
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
      aria-labelledby="utilities-modal-title"
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
          aria-label="Close utilities modal (Esc)"
        >
          ×
        </button>
        <div className={WIDE_SECTION_STACK}>
          <header className="space-y-2 text-center lg:text-left">
            <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/70">Code Utilities</p>
            <h3 id="utilities-modal-title" className="text-2xl font-semibold text-white">
              Install Libraries &amp; Generate Token
            </h3>
            <p className={BODY_TEXT}>
              Manage required packages and produce a secure connection token without leaving your workspace.
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className={`${SECTION_STACK} rounded-2xl border border-slate-800/80 bg-slate-900/85 p-6`}>
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-white">Required Libraries</h4>
                <span className="text-xs uppercase tracking-[0.35em] text-emerald-300/70">
                  {requiredLibraries.length} packages
                </span>
              </div>
              <p className={BODY_TEXT}>
                Install the recommended dependencies before launching your robot session.
              </p>
              <div className="max-h-64 space-y-3 overflow-y-auto pr-2">
                {requiredLibraries.map((library) => {
                  const status = libraryStatus[library.name];
                  const isCurrent = currentInstall === library.name && isInstalling;
                  const label = status === 'installed' ? 'Installed' : isCurrent ? 'Installing…' : 'Install';

                  return (
                    <div
                      key={library.name}
                      className="flex items-start justify-between gap-3 rounded-xl border border-slate-800/60 bg-slate-900/80 p-4 text-left transition hover:border-emerald-500/40 hover:bg-slate-900"
                    >
                      <div>
                        <p className="text-sm font-semibold uppercase tracking-wide text-white">{library.name}</p>
                        <p className="mt-2 text-xs text-slate-400">{library.summary}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => onInstallLibrary(library)}
                        className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 disabled:cursor-not-allowed disabled:opacity-60 ${
                          status === 'installed'
                            ? 'bg-emerald-500/25 text-emerald-200'
                            : 'bg-emerald-500 text-emerald-950 hover:bg-emerald-400'
                        }`}
                        disabled={status === 'installed' || isInstalling}
                        aria-label={`${label} ${library.name}`}
                      >
                        {label}
                      </button>
                    </div>
                  );
                })}
              </div>
              {isInstalling && currentInstall ? (
                <div className="overflow-hidden rounded-full border border-emerald-500/30 bg-slate-900/80">
                  <div className="h-2 w-full animate-pulse bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400" />
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
            </section>

            <section className={`${SECTION_STACK} rounded-2xl border border-slate-800/80 bg-slate-900/85 p-6`}>
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-white">Generate Token</h4>
                <p className={BODY_TEXT}>Create and copy an encrypted access token for robot connectivity.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs uppercase tracking-wide text-slate-400" htmlFor="network-name-input">
                    Network Name
                  </label>
                  <input
                    id="network-name-input"
                    type="text"
                    value={networkName}
                    onChange={(event) => onNetworkNameChange(event.target.value)}
                    placeholder="Network Name"
                    className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wide text-slate-400" htmlFor="network-password-input">
                    Network Password
                  </label>
                  <input
                    id="network-password-input"
                    type="password"
                    value={networkPassword}
                    onChange={(event) => onNetworkPasswordChange(event.target.value)}
                    placeholder="••••••••"
                    className="mt-2 w-full rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-white outline-none focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>
                <button
                  type="button"
                  onClick={onGenerateToken}
                  className="w-full rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold uppercase tracking-wide text-emerald-950 shadow-lg shadow-emerald-800/40 transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400"
                  aria-label="Generate network token"
                >
                  Generate Token
                </button>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Token Preview</p>
                  <div className="mt-2 break-all rounded-lg bg-slate-950/60 p-3 text-sm font-mono text-emerald-300">
                    {generatedToken || <span className="text-slate-500">Token will display here after generation.</span>}
                  </div>
                  <button
                    type="button"
                    onClick={onCopyToken}
                    disabled={!generatedToken}
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-200 transition hover:bg-emerald-500/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                    aria-label={isTokenCopied ? 'Token copied to clipboard' : 'Copy token to clipboard'}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3h6A2.5 2.5 0 0 1 16 5.5v8a2.5 2.5 0 0 1-2.5 2.5h-6A2.5 2.5 0 0 1 5 13.5v-8Z" />
                      <path d="M4 6.5A2.5 2.5 0 0 0 1.5 9v8A2.5 2.5 0 0 0 4 19.5h6A2.5 2.5 0 0 0 12.5 17v-1.25h-1.5V17a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h1.25V6.5H4Z" />
                    </svg>
                    Copy Token
                    {isTokenCopied ? <span className="text-emerald-400">Copied!</span> : null}
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UtilitiesModal;

