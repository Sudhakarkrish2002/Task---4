import SectionHeader from '../ui/SectionHeader';
import { BODY_TEXT, PANEL_PADDED, SECTION_STACK } from '../ui/layoutTokens';

function ModulesSection({ icon, modules, onSelectModule, searchValue = '', onSearchChange }) {
  const handleSearch = (event) => {
    if (onSearchChange) {
      onSearchChange(event.target.value);
    }
  };

  return (
    <section className={SECTION_STACK}>
      <SectionHeader icon={icon} title="Modules" eyebrow="Project Library" />
      <p className="max-w-2xl text-slate-300">
        Dive into hands-on projects designed to reinforce core robotics skills. Select a module to view detailed
        objectives, resources, and launch options.
      </p>

      <div className="relative max-w-md">
        <label className="sr-only" htmlFor="module-search">
          Search modules
        </label>
        <input
          id="module-search"
          type="search"
          value={searchValue}
          onChange={handleSearch}
          placeholder="Search modules..."
          className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/30"
        />
      </div>

      {modules.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 text-sm text-slate-400">
          No modules match your search. Try a different keyword or clear the filter.
        </div>
      ) : (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {modules.map((module) => (
          <article
            key={module.title}
            onClick={() => onSelectModule(module)}
            className={`${PANEL_PADDED} group flex flex-col cursor-pointer transition hover:border-emerald-500/40 hover:shadow-emerald-800/20 hover:shadow-xl`}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectModule(module);
              }
            }}
            aria-label={`View details for ${module.title}`}
          >
            <div className="relative w-full h-48 rounded-xl overflow-hidden bg-gradient-to-br from-emerald-500/20 via-slate-800/60 to-slate-900/80 mb-4 flex items-center justify-center">
              {module.thumbnail ? (
                <img
                  src={module.thumbnail}
                  alt={module.imageAlt || module.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-4">
                  <div className="rounded-2xl bg-emerald-500/15 p-4 text-emerald-300 mb-3">
                    <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.6"
                        d="M12 3 4 7v5c0 5.25 3.5 10 8 11 4.5-1 8-5.75 8-11V7l-8-4z"
                      />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M9 12h6M12 9v6" />
                    </svg>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-emerald-200/70">
                    {module.title}
                  </span>
                </div>
              )}
            </div>
            <h3 className="text-lg font-semibold text-white group-hover:text-emerald-200 transition-colors">
              {module.title}
            </h3>
            <p className={`mt-2 ${BODY_TEXT} line-clamp-2`}>{module.description}</p>
            <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-400 group-hover:text-emerald-300 transition-colors">
              View Details
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="m6.2 4.2 4.6 3.8-4.6 3.8V4.2z" />
              </svg>
            </div>
          </article>
        ))}
      </div>
      )}
    </section>
  );
}

export default ModulesSection;

