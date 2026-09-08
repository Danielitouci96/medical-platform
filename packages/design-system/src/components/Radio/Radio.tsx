import * as React from 'react';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import classNames from 'classnames';
import type { InputValidationState } from '../Input/Input';

export interface RadioItemProps {
  value: string;
  id?: string;
  disabled?: boolean;
  label?: React.ReactNode;
  className?: string;
}

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'value' | 'dir'> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  orientation?: 'vertical' | 'horizontal';
  validationState?: InputValidationState;
  name?: string;
  required?: boolean;
  items: RadioItemProps[];
  label?: React.ReactNode;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  {
    value,
    defaultValue,
    onValueChange,
    disabled,
    orientation = 'vertical',
    validationState = 'default',
    name,
    required,
    items,
    label,
    className,
    ...rest
  },
  ref,
) {
  return (
    <RadixRadioGroup.Root
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      orientation={orientation}
      name={name}
      required={required}
      aria-label={typeof label === 'string' ? label : undefined}
      className={classNames(
        'med-radio-group',
        `med-radio-group--${orientation}`,
        className,
      )}
      {...rest}
    >
      {items.map((item) => (
        <span key={item.value} className="med-radio-group__item">
          <RadixRadioGroup.Item
            value={item.value}
            id={item.id}
            disabled={item.disabled}
            className={classNames('med-radio', `med-radio--state-${validationState}`, item.className)}
          >
            <RadixRadioGroup.Indicator className="med-radio__indicator" />
          </RadixRadioGroup.Item>
          {item.label ? (
            <label className="med-radio__label" htmlFor={item.id}>
              {item.label}
            </label>
          ) : null}
        </span>
      ))}
    </RadixRadioGroup.Root>
  );
});

export { RadioGroup };
export default RadioGroup;