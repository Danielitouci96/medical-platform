import * as React from 'react';
import classNames from 'classnames';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerTone = 'default' | 'primary' | 'current';

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: SpinnerSize;
  tone?: SpinnerTone;
  /** Accessible label for screen readers. */
  label?: string;
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  { size = 'md', tone = 'current', label = 'Loading', className, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      role="status"
      className={classNames('med-spinner', `med-spinner--size-${size}`, `med-spinner--tone-${tone}`, className)}
      {...rest}
    >
      <span className="med-visually-hidden">{label}</span>
    </span>
  );
});

export { Spinner };
export default Spinner;