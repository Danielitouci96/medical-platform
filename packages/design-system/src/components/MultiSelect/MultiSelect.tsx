import * as React from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import classNames from 'classnames';
import { Icon } from '../../icons/Icon';

export interface MultiSelectOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (next: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  ariaLabel?: string;
  className?: string;
  maxHeight?: number;
}

const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(function MultiSelect(
  {
    options,
    value,
    defaultValue = [],
    onChange,
    placeholder = 'Select…',
    disabled,
    ariaLabel,
    className,
    maxHeight = 280,
  },
  ref,
) {
  const [internal, setInternal] = React.useState<string[]>(defaultValue);
  const [open, setOpen] = React.useState(false);
  const selected = value ?? internal;

  const toggle = (val: string) => {
    const next = selected.includes(val) ? selected.filter((v) => v !== val) : [...selected, val];
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  const selectedLabels = options
    .filter((o) => selected.includes(o.value))
    .map((o) => o.label);

  const clearAll = () => {
    if (value === undefined) setInternal([]);
    onChange?.([]);
  };

  return (
    <RadixPopover.Root open={open} onOpenChange={setOpen}>
      <RadixPopover.Trigger asChild>
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          className={classNames('med-multiselect', className)}
          aria-label={ariaLabel}
          aria-expanded={open}
        >
          <span className="med-multiselect__value">
            {selectedLabels.length > 0 ? (
              selectedLabels.length <= 2 ? (
                selectedLabels.join(', ')
              ) : (
                `${selectedLabels.length} selected`
              )
            ) : (
              <span className="med-multiselect__placeholder">{placeholder}</span>
            )}
          </span>
          <Icon name="ChevronDown" size="sm" className="med-multiselect__chevron" aria-hidden="true" />
        </button>
      </RadixPopover.Trigger>

      <RadixPopover.Portal>
        <RadixPopover.Content
          sideOffset={4}
          align="start"
          className="med-multiselect__content"
          style={{ maxHeight }}
        >
          <div className="med-multiselect__header">
            <span className="med-multiselect__title">
              {selected.length > 0 ? `${selected.length} selected` : 'Select options'}
            </span>
            {selected.length > 0 ? (
              <button type="button" className="med-multiselect__clear" onClick={clearAll}>
                Clear
              </button>
            ) : null}
          </div>
          <div className="med-multiselect__list">
            {options.map((opt) => {
              const isChecked = selected.includes(opt.value);
              return (
                <label
                  key={opt.value}
                  className={classNames(
                    'med-multiselect__option',
                    isChecked && 'med-multiselect__option--selected',
                    opt.disabled && 'med-multiselect__option--disabled',
                  )}
                >
                  <input
                    type="checkbox"
                    className="med-multiselect__checkbox"
                    checked={isChecked}
                    disabled={opt.disabled}
                    onChange={() => toggle(opt.value)}
                  />
                  <span className="med-multiselect__option-label">{opt.label}</span>
                  {isChecked ? (
                    <Icon name="Check" size="xs" className="med-multiselect__option-check" aria-hidden="true" />
                  ) : null}
                </label>
              );
            })}
            {options.length === 0 ? (
              <div className="med-multiselect__empty">No options</div>
            ) : null}
          </div>
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
});

export { MultiSelect };
export default MultiSelect;