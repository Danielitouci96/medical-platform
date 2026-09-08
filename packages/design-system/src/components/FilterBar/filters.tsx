import * as React from 'react';
import { SearchInput } from '../SearchInput/SearchInput';
import { Input } from '../Input/Input';
import { Select, SelectItem } from '../Select/Select';
import { MultiSelect } from '../MultiSelect/MultiSelect';
import { NumberInput } from '../NumberInput/NumberInput';

export interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
}

export const SearchFilter = React.forwardRef<HTMLInputElement, SearchFilterProps>(function SearchFilter(
  { value, onChange, placeholder = 'Search…', label = 'Search' },
  ref,
) {
  return (
    <div className="med-filter-control">
      <label className="med-filter-control__label">{label}</label>
      <SearchInput ref={ref} value={value} onSearchChange={onChange} placeholder={placeholder} />
    </div>
  );
});

export interface SelectFilterOption {
  value: string;
  label: string;
}

export interface SelectFilterProps {
  value?: string;
  onChange: (value: string | undefined) => void;
  options: SelectFilterOption[];
  placeholder?: string;
  label?: string;
  clearable?: boolean;
}

export const SelectFilter = React.forwardRef<HTMLButtonElement, SelectFilterProps>(function SelectFilter(
  { value, onChange, options, placeholder = 'All', label, clearable = true },
  ref,
) {
  const allOption = clearable ? (
    <SelectItem value="__all__">{placeholder}</SelectItem>
  ) : null;

  return (
    <div className="med-filter-control">
      {label ? <label className="med-filter-control__label">{label}</label> : null}
      <Select
        ref={ref}
        value={value ?? '__all__'}
        onValueChange={(v) => onChange(v === '__all__' ? undefined : v)}
        size="sm"
      >
        {allOption}
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
});

export interface MultiSelectFilterOption {
  value: string;
  label: string;
}

export interface MultiSelectFilterProps {
  value: string[];
  onChange: (value: string[]) => void;
  options: MultiSelectFilterOption[];
  placeholder?: string;
  label?: string;
}

export const MultiSelectFilter = React.forwardRef<HTMLButtonElement, MultiSelectFilterProps>(
  function MultiSelectFilter({ value, onChange, options, placeholder = 'Any', label }, ref) {
    return (
      <div className="med-filter-control">
        {label ? <label className="med-filter-control__label">{label}</label> : null}
        <div className="med-filter-control__multiselect">
          <MultiSelect
            ref={ref}
            options={options}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        </div>
      </div>
    );
  },
);

export interface DateFilterProps {
  value?: string;
  onChange: (value: string | undefined) => void;
  label?: string;
}

export const DateFilter = React.forwardRef<HTMLInputElement, DateFilterProps>(function DateFilter(
  { value, onChange, label = 'Date' },
  ref,
) {
  return (
    <div className="med-filter-control">
      <label className="med-filter-control__label">{label}</label>
      <Input
        ref={ref}
        type="date"
        size="sm"
        value={value ?? ''}
        onChange={(e) => onChange(e.target.value || undefined)}
      />
    </div>
  );
});

export interface DateRangeFilterProps {
  start?: string;
  end?: string;
  onChange: (start: string | undefined, end: string | undefined) => void;
  label?: string;
}

export const DateRangeFilter = React.forwardRef<HTMLDivElement, DateRangeFilterProps>(function DateRangeFilter(
  { start, end, onChange, label = 'Date range' },
  ref,
) {
  return (
    <div ref={ref} className="med-filter-control">
      <label className="med-filter-control__label">{label}</label>
      <div className="med-filter-control__range">
        <Input
          type="date"
          size="sm"
          value={start ?? ''}
          aria-label="Start date"
          onChange={(e) => onChange(e.target.value || undefined, end)}
        />
        <span className="med-filter-control__range-sep">–</span>
        <Input
          type="date"
          size="sm"
          value={end ?? ''}
          aria-label="End date"
          min={start}
          onChange={(e) => onChange(start, e.target.value || undefined)}
        />
      </div>
    </div>
  );
});

export interface NumberRangeFilterProps {
  min?: number;
  max?: number;
  onChange: (min: number | undefined, max: number | undefined) => void;
  label?: string;
}

export const NumberRangeFilter = React.forwardRef<HTMLDivElement, NumberRangeFilterProps>(function NumberRangeFilter(
  { min, max, onChange, label = 'Range' },
  ref,
) {
  return (
    <div ref={ref} className="med-filter-control">
      <label className="med-filter-control__label">{label}</label>
      <div className="med-filter-control__range">
        <NumberInput
          size="sm"
          value={min ?? ''}
          aria-label="Minimum"
          placeholder="Min"
          onValueChange={(v) => onChange(v === '' ? undefined : Number(v), max)}
        />
        <span className="med-filter-control__range-sep">–</span>
        <NumberInput
          size="sm"
          value={max ?? ''}
          aria-label="Maximum"
          placeholder="Max"
          onValueChange={(v) => onChange(min, v === '' ? undefined : Number(v))}
        />
      </div>
    </div>
  );
});