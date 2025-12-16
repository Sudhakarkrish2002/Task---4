import Tooltip from './Tooltip';

function Button({
  children,
  onClick,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'md',
  type = 'button',
  tooltip,
  tooltipPosition = 'top',
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 disabled:cursor-not-allowed disabled:opacity-60';

  const variantStyles = {
    primary: 'bg-emerald-500 text-emerald-950 shadow-lg shadow-emerald-800/40 hover:bg-emerald-400 disabled:hover:bg-emerald-500',
    secondary: 'border border-emerald-400/40 bg-transparent text-emerald-200 hover:bg-emerald-500/10 disabled:hover:bg-transparent',
    tertiary: 'border border-slate-800/80 bg-slate-900/80 text-slate-300 hover:bg-slate-900 hover:text-white disabled:hover:bg-slate-900/80',
    danger: 'bg-rose-500 text-white shadow-lg shadow-rose-800/40 hover:bg-rose-400 disabled:hover:bg-rose-500',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-xs',
    lg: 'px-6 py-3 text-sm',
  };

  const button = (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );

  if (tooltip) {
    return (
      <Tooltip content={tooltip} position={tooltipPosition}>
        {button}
      </Tooltip>
    );
  }

  return button;
}

export default Button;

