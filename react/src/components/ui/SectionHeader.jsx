import { EYEBROW_TEXT, ICON_BADGE } from './layoutTokens';

function SectionHeader({
  icon,
  title,
  eyebrow,
  subtitle,
  titleClassName = 'text-2xl font-semibold text-white',
  actions,
  className = '',
}) {
  return (
    <div className={`flex flex-wrap items-center justify-between gap-4 ${className}`}>
      <div className="flex items-center gap-3">
        {icon ? <span className={ICON_BADGE}>{icon}</span> : null}
        <div>
          {eyebrow ? <p className={EYEBROW_TEXT}>{eyebrow}</p> : null}
          <h2 className={titleClassName}>{title}</h2>
          {subtitle ? <p className="text-sm text-slate-400">{subtitle}</p> : null}
        </div>
      </div>
      {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
    </div>
  );
}

export default SectionHeader;

