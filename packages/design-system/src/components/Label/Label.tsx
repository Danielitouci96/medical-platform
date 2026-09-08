import * as React from 'react';
import classNames from 'classnames';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Whether the field is required (adds visual indicator, does not set aria). */
  required?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { required, size = 'md', className, children, htmlFor, ...rest },
  ref,
) {
  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={classNames('med-label', `med-label--size-${size}`, className)}
      {...rest}
    >
      {children}
      {required ? (
        <span className="med-label__required" aria-hidden="true">
          {' '}
          *
        </span>
      ) : null}
    </label>
  );
});

export { Label };
export default Label;