import * as React from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import classNames from 'classnames';
import { Icon } from '../../icons/Icon';
import type { InputValidationState } from '../Input/Input';

export interface CheckboxProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value'> {
  checked?: boolean | 'indeterminate';
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
  disabled?: boolean;
  validationState?: InputValidationState;
  size?: 'sm' | 'md' | 'lg';
  label?: React.ReactNode;
  id?: string;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(function Checkbox(
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
  const box = (
    <RadixCheckbox.Root
      ref={ref}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      id={id}
      className={classNames(
        'med-checkbox',
        `med-checkbox--size-${size}`,
        `med-checkbox--state-${validationState}`,
        className,
      )}
      {...rest}
    >
      <RadixCheckbox.Indicator className="med-checkbox__indicator">
        {checked === 'indeterminate' ? (
          <Icon name="Minus" size={size === 'sm' ? 'xs' : 'sm'} aria-hidden="true" />
        ) : (
          <Icon name="Check" size={size === 'sm' ? 'xs' : 'sm'} aria-hidden="true" />
        )}
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );

  if (label) {
    return (
      <span className={classNames('med-checkbox__wrapper', disabled && 'med-checkbox__wrapper--disabled')}>
        {box}
        <label className="med-checkbox__label" htmlFor={id}>
          {label}
        </label>
      </span>
    );
  }

  return box;
});

export { Checkbox };
export default Checkbox;