import { useState, useRef, useEffect } from 'react';

function Tooltip({ children, content, position = 'top', className = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0, placement: position });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (isVisible && triggerRef.current && tooltipRef.current) {
      const trigger = triggerRef.current;
      const tooltip = tooltipRef.current;
      const rect = trigger.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      const margin = 8;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let placement = position;
      let top = 0;
      let left = 0;

      const computePosition = (pos) => {
        switch (pos) {
          case 'top':
            return {
              top: rect.top - tooltipRect.height - margin,
              left: rect.left + rect.width / 2 - tooltipRect.width / 2,
            };
          case 'bottom':
            return {
              top: rect.bottom + margin,
              left: rect.left + rect.width / 2 - tooltipRect.width / 2,
            };
          case 'left':
            return {
              top: rect.top + rect.height / 2 - tooltipRect.height / 2,
              left: rect.left - tooltipRect.width - margin,
            };
          case 'right':
            return {
              top: rect.top + rect.height / 2 - tooltipRect.height / 2,
              left: rect.right + margin,
            };
          default:
            return {
              top: rect.top - tooltipRect.height - margin,
              left: rect.left + rect.width / 2 - tooltipRect.width / 2,
            };
        }
      };

      ({ top, left } = computePosition(placement));

      // If preferred top placement overflows, flip to bottom when possible (and vice versa)
      if (placement === 'top' && top < margin && rect.bottom + tooltipRect.height + margin <= viewportHeight) {
        placement = 'bottom';
        ({ top, left } = computePosition(placement));
      } else if (
        placement === 'bottom' &&
        top + tooltipRect.height + margin > viewportHeight &&
        rect.top - tooltipRect.height - margin >= margin
      ) {
        placement = 'top';
        ({ top, left } = computePosition(placement));
      }

      // Clamp tooltip within the viewport so it doesn't get hidden off-screen
      const clampedTop = Math.max(margin, Math.min(top, viewportHeight - tooltipRect.height - margin));
      const clampedLeft = Math.max(margin, Math.min(left, viewportWidth - tooltipRect.width - margin));

      setTooltipPosition({ top: clampedTop, left: clampedLeft, placement });
    }
  }, [isVisible, position]);

  if (!content) {
    return children;
  }

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onFocus={() => setIsVisible(true)}
        onBlur={() => setIsVisible(false)}
        className="inline-block"
      >
        {children}
      </div>
      {isVisible && (
        <div
          ref={tooltipRef}
          role="tooltip"
          className={`fixed z-50 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-medium text-slate-200 shadow-lg shadow-slate-950/50 backdrop-blur-sm ${className}`}
          style={{
            top: `${tooltipPosition.top}px`,
            left: `${tooltipPosition.left}px`,
            pointerEvents: 'none',
          }}
        >
          {content}
          <div
            className="absolute h-2 w-2 rotate-45 border-r border-b border-slate-700 bg-slate-900"
            style={{
              [(tooltipPosition.placement || position) === 'top' ? 'bottom' : 'top']: '-4px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        </div>
      )}
    </>
  );
}

export default Tooltip;

