import * as React from 'react';
import classNames from 'classnames';
import type { ButtonVariant, ButtonSize } from '../Button/Button';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether buttons are joined into a single control. */
  attached?: boolean;
  /** Default variant applied to child buttons. */
  variant?: ButtonVariant;
  /** Default size applied to child buttons. */
  size?: ButtonSize;
  /** Orientation of the group. */
  orientation?: 'horizontal' | 'vertical';
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  { attached = false, variant, size, orientation = 'horizontal', className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="group"
      className={classNames(
        'med-button-group',
        attached && 'med-button-group--attached',
        `med-button-group--${orientation}`,
        className,
      )}
      data-variant={variant}
      data-size={size}
      {...rest}
    >
      {children}
    </div>
  );
});

export { ButtonGroup };
export default ButtonGroup;