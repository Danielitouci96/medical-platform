import * as React from 'react';
import classNames from 'classnames';

export interface ProgressProps extends React.ComponentPropsWithoutRef<'div'> {
  value: number; // 0..100
  max?: number;
  tone?: 'default' | 'info' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  /** Accessible label. */
  ariaLabel?: string;
  /** Show the numeric value as text. */
  showValue?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  { value, max = 100, tone = 'default', size = 'md', ariaLabel = 'Progress', showValue, className, ...rest },
  ref,
) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={ariaLabel}
      className={classNames(
        'med-progress',
        `med-progress--size-${size}`,
        `med-progress--tone-${tone}`,
        className,
      )}
      {...rest}
    >
      <div className="med-progress__track">
        <div className="med-progress__bar" style={{ width: `${pct}%` }} />
      </div>
      {showValue ? <span className="med-progress__value">{Math.round(pct)}%</span> : null}
    </div>
  );
});

export { Progress };
export default Progress;