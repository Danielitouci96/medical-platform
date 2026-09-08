import * as React from 'react';
import classNames from 'classnames';

export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: DividerOrientation;
  /** Apply a label in the middle (horizontal only). */
  label?: React.ReactNode;
}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(function Divider(
  { orientation = 'horizontal', label, className, ...rest },
  ref,
) {
  if (orientation === 'vertical') {
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="vertical"
        className={classNames('med-divider', 'med-divider--vertical', className)}
        {...rest}
      />
    );
  }

  if (label) {
    return (
      <div className={classNames('med-divider', 'med-divider--with-label', className)} {...rest}>
        <span className="med-divider__line" aria-hidden="true" />
        <span className="med-divider__label">{label}</span>
        <span className="med-divider__line" aria-hidden="true" />
      </div>
    );
  }

  return <hr ref={ref} className={classNames('med-divider', className)} {...rest} />;
});

export { Divider };
export default Divider;