import * as React from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import classNames from 'classnames';
import { Icon } from '../../icons/Icon';
import type { InputValidationState, InputSize } from '../Input/Input';

export interface SelectItemProps {
  value: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(function SelectItem(
  { value, disabled, children, ...rest },
  ref,
) {
  return (
    <RadixSelect.Item
      ref={ref}
      value={value}
      disabled={disabled}
      className="med-select__item"
      {...rest}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className="med-select__item-indicator">
        <Icon name="Check" size="xs" aria-hidden="true" />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
});

export interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  disabled?: boolean;
  validationState?: InputValidationState;
  size?: InputSize;
  fullWidth?: boolean;
  ariaLabel?: string;
  className?: string;
  children?: React.ReactNode;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(function Select(
  {
    value,
    onValueChange,
    onOpenChange,
    placeholder = 'Select…',
    disabled,
    validationState = 'default',
    size = 'md',
    fullWidth,
    ariaLabel,
    className,
    children,
  },
  ref,
) {
  return (
    <RadixSelect.Root value={value} onValueChange={onValueChange} onOpenChange={onOpenChange} disabled={disabled}>
      <RadixSelect.Trigger
        ref={ref}
        className={classNames(
          'med-select',
          `med-select--size-${size}`,
          `med-select--state-${validationState}`,
          fullWidth && 'med-select--full-width',
          className,
        )}
        aria-label={ariaLabel}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className="med-select__chevron">
          <Icon name="ChevronDown" size="sm" aria-hidden="true" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content position="popper" sideOffset={4} className="med-select__content">
          <RadixSelect.ScrollUpButton className="med-select__scroll-button">
            <Icon name="ChevronUp" size="sm" aria-hidden="true" />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport className="med-select__viewport">
            {children}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className="med-select__scroll-button">
            <Icon name="ChevronDown" size="sm" aria-hidden="true" />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
});

export { Select, SelectItem };
export default Select;