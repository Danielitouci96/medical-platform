import * as React from 'react';
import classNames from 'classnames';
import { IconButton } from '../IconButton/IconButton';
import { Input, type InputProps } from '../Input/Input';

export interface PasswordInputProps extends Omit<InputProps, 'type'> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
  { className, ...rest },
  ref,
) {
  const [show, setShow] = React.useState(false);

  return (
    <div className={classNames('med-password-input', className)}>
      <Input
        ref={ref}
        type={show ? 'text' : 'password'}
        className="med-password-input__input"
        {...rest}
      />
      <IconButton
        type="button"
        icon={show ? 'EyeOff' : 'Eye'}
        aria-label={show ? 'Hide password' : 'Show password'}
        size={rest.size === 'sm' ? 'sm' : rest.size === 'lg' ? 'lg' : 'md'}
        variant="ghost"
        onClick={() => setShow((s) => !s)}
        className="med-password-input__toggle"
      />
    </div>
  );
});

export { PasswordInput };
export default PasswordInput;