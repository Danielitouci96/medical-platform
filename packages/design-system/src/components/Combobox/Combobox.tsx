import * as React from 'react';
import classNames from 'classnames';
import { Input, type InputProps } from '../Input/Input';
import { Icon } from '../../icons/Icon';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps extends Omit<InputProps, 'onSelect' | 'value' | 'onChange'> {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  onSelect?: (option: ComboboxOption) => void;
  /** Placeholder for the input. */
  placeholder?: string;
  /** Open automatically when the input receives focus. */
  openOnFocus?: boolean;
  /** Clear the input when a selection is made. */
  clearOnSelect?: boolean;
}

const Combobox = React.forwardRef<HTMLInputElement, ComboboxProps>(function Combobox(
  {
    options,
    value,
    onValueChange,
    onSelect,
    placeholder,
    openOnFocus = true,
    clearOnSelect = false,
    className,
    ...rest
  },
  ref,
) {
  const [query, setQuery] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [highlighted, setHighlighted] = React.useState(0);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const filtered = options.filter((o) => o.label.toLowerCase().includes(query.toLowerCase()));

  React.useEffect(() => {
    if (!open) setHighlighted(0);
  }, [open]);

  React.useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const selectOption = (opt: ComboboxOption) => {
    onSelect?.(opt);
    onValueChange?.(opt.value);
    setQuery(clearOnSelect ? '' : opt.label);
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(true);
      setHighlighted((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, 0));
    } else if (e.key === 'Enter') {
      if (open && filtered[highlighted]) {
        e.preventDefault();
        selectOption(filtered[highlighted]);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className={classNames('med-combobox', className)}>
      <Input
        ref={ref}
        value={value !== undefined ? value : query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
          onValueChange?.(e.target.value);
        }}
        onFocus={() => openOnFocus && setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        role="combobox"
        aria-expanded={open}
        aria-autocomplete="list"
        className="med-combobox__input"
        {...rest}
      />
      {open ? (
        <ul role="listbox" className="med-combobox__list">
          {filtered.length > 0 ? (
            filtered.map((opt, i) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={i === highlighted}
                className={classNames(
                  'med-combobox__option',
                  i === highlighted && 'med-combobox__option--highlighted',
                  opt.disabled && 'med-combobox__option--disabled',
                )}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => !opt.disabled && selectOption(opt)}
                onMouseEnter={() => setHighlighted(i)}
              >
                {opt.label}
                {i === highlighted ? (
                  <Icon name="Check" size="xs" className="med-combobox__check" aria-hidden="true" />
                ) : null}
              </li>
            ))
          ) : (
            <li className="med-combobox__empty">No results</li>
          )}
        </ul>
      ) : null}
    </div>
  );
});

export { Combobox };
export default Combobox;