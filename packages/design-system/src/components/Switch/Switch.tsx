import * as React from 'react';
import * as RadixSwitch from '@radix-ui/react-switch';
import classNames from 'classnames';
import type { InputValidationState } from '../Input/Input';

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  validationState?: InputValidationState;
  size?: 'sm' | 'md' | 'lg';
  label?: React.ReactNode;
  id?: string;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(function Switch(
  {
    checked,
    defaultChecked,
    onCheckedChange,
    disabled,
    validationState = 'default',
    size = 'md',
    label,
    id,
    className,
    ...rest
  },
  ref,
) {
  const control = (
    <RadixSwitch.Root
      ref={ref}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      id={id}
      className={classNames(
        'med-switch',
        `med-switch--size-${size}`,
        `med-switch--state-${validationState}`,
        disabled && 'med-switch--disabled',
        className,
      )}
      {...rest}
    >
      <RadixSwitch.Thumb className="med-switch__thumb" />
    </RadixSwitch.Root>
  );

  if (label) {
    return (
      <span className={classNames('med-switch__wrapper', disabled && 'med-switch__wrapper--disabled')}>
        {control}
        <label className="med-switch__label" htmlFor={id}>
          {label}
        </label>
      </span>
    );
  }

  return control;
});

export { Switch };
export default Switch;