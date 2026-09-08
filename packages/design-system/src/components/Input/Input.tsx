import * as React from 'react';
import classNames from 'classnames';

export type InputValidationState = 'default' | 'error' | 'success' | 'warning';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Validation state (affects border/ring styling). */
  validationState?: InputValidationState;
  size?: InputSize;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { validationState = 'default', size = 'md', fullWidth, className, ...rest },
  ref,
) {
  return (
    <input
      ref={ref}
      className={classNames(
        'med-input',
        `med-input--size-${size}`,
        `med-input--state-${validationState}`,
        fullWidth && 'med-input--full-width',
        className,
      )}
      {...rest}
    />
  );
});

export { Input };
export default Input;