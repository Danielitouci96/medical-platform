import * as React from 'react';
import classNames from 'classnames';
import { Icon, type IconName } from '../../icons/Icon';
import { Input, type InputProps } from '../Input/Input';

export interface SearchInputProps extends Omit<InputProps, 'type'> {
  /** Debounce delay before calling onSearchChange (ms). */
  debounceMs?: number;
  /** Called as the user types (immediately). */
  onSearchChange?: (value: string) => void;
  /** Called with the current value when the user presses Enter or clears. */
  onSearch?: (value: string) => void;
  /** Placeholder text. */
  placeholder?: string;
  /** Optional leading icon override. */
  icon?: IconName;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { debounceMs = 200, onSearchChange, onSearch, placeholder = 'Search…', icon = 'Search', className, ...rest },
  ref,
) {
  const [value, setValue] = React.useState('');
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    onSearchChange?.(v);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => onSearch?.(v), debounceMs);
  };

  const clear = () => {
    setValue('');
    onSearchChange?.('');
    onSearch?.('');
    if (timer.current) clearTimeout(timer.current);
  };

  return (
    <div className={classNames('med-search-input', className)}>
      <Icon name={icon} size="sm" className="med-search-input__icon" aria-hidden="true" />
      <Input
        ref={ref}
        type="search"
        role="searchbox"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="med-search-input__input"
        {...rest}
      />
      {value ? (
        <button type="button" className="med-search-input__clear" onClick={clear} aria-label="Clear search">
          <Icon name="X" size="sm" aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
});

export { SearchInput };
export default SearchInput;