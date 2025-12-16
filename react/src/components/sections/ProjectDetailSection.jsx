import SectionHeader from '../ui/SectionHeader';
import { SECTION_STACK } from '../ui/layoutTokens';

function ProjectDetailSection({ icon, project, onStartCoding }) {
  if (!project) {
    return null;
  }

  // Create description text from detail array or use existing description
  const fullDescription = project.fullDescription || 
    (project.detail ? project.detail.join(' ') : project.description || '');

  return (
    <section className="grid gap-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-8 lg:grid-cols-2">
      <div className={SECTION_STACK}>
        <SectionHeader
          icon={icon}
          eyebrow="Project Detail"
          title={project.title}
          titleClassName="text-3xl font-semibold text-white"
        />

        <div className="mt-4">
          <p className="text-base leading-relaxed text-slate-300 whitespace-pre-line">
            {fullDescription}
          </p>
        </div>

        <button
          type="button"
          onClick={onStartCoding}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-emerald-950 shadow-lg shadow-emerald-800/40 transition hover:bg-emerald-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
          aria-label={`Start coding ${project.title}`}
        >
          Get Started
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="m6.2 4.2 4.6 3.8-4.6 3.8V4.2z" />
          </svg>
        </button>
      </div>

      <aside className="flex items-center justify-center">
        <div className="relative w-full h-full min-h-[400px] max-w-md rounded-3xl border border-slate-800/70 bg-slate-950/60 overflow-hidden">
          {project.image ? (
            <img
              src={project.image}
              alt={project.imageAlt || project.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center p-6">
              <div className="text-center">
                <div className="mx-auto mb-4 rounded-2xl bg-emerald-500/15 p-6 text-emerald-300 w-24 h-24 flex items-center justify-center">
                  <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.6"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-slate-400 mt-4">
                  {project.imageAlt || `${project.title} setup image or schematic`}
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </section>
  );
}

export default ProjectDetailSection;

