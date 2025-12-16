import SectionHeader from '../ui/SectionHeader';
import { SECTION_STACK } from '../ui/layoutTokens';

function InfoSection({ icon, title, eyebrow, description, children }) {
  return (
    <section className={`${SECTION_STACK} rounded-2xl border border-slate-800 bg-slate-900/60 p-6`}>
      <SectionHeader icon={icon} title={title} eyebrow={eyebrow} titleClassName="text-xl font-semibold text-white" />
      {description ? <p className="max-w-3xl text-base text-slate-300">{description}</p> : null}
      {children}
    </section>
  );
}

export default InfoSection;

