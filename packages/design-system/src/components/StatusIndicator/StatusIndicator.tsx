import * as React from 'react';
import classNames from 'classnames';

export type StatusTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger';

export interface StatusIndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: StatusTone;
  /** Indicates an active/pulsing state. */
  pulse?: boolean;
  label?: React.ReactNode;
  /** Show as a solid dot (visual). */
  showDot?: boolean;
}

const StatusIndicator = React.forwardRef<HTMLSpanElement, StatusIndicatorProps>(function StatusIndicator(
  { tone = 'neutral', pulse, label, showDot = true, className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      role="status"
      className={classNames('med-status-indicator', `med-status-indicator--tone-${tone}`, className)}
      {...rest}
    >
      {showDot ? (
        <span
          className={classNames(
            'med-status-indicator__dot',
            pulse && 'med-status-indicator__dot--pulse',
          )}
          aria-hidden="true"
        />
      ) : null}
      {label ?? children}
    </span>
  );
});

export { StatusIndicator };
export default StatusIndicator;