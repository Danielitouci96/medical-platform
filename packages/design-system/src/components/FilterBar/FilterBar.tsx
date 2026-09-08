import * as React from 'react';
import classNames from 'classnames';
import { SearchInput } from '../SearchInput/SearchInput';
import { FilterButton } from './FilterButton';

export interface FilterBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Search input value + handler. */
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  /** Whether to show the search box. */
  showSearch?: boolean;
  /** Whether to show the "Filters" button (with active count). */
  showFilterButton?: boolean;
  activeFilterCount?: number;
  onFilterButtonClick?: () => void;
  /** Children: typically FilterChips or extra filter controls. */
  children?: React.ReactNode;
  /** Quick selects rendered inline. */
  quickSelects?: React.ReactNode;
}

const FilterBar = React.forwardRef<HTMLDivElement, FilterBarProps>(function FilterBar(
  {
    searchValue,
    onSearchChange,
    searchPlaceholder = 'Search…',
    showSearch = true,
    showFilterButton = true,
    activeFilterCount = 0,
    onFilterButtonClick,
    children,
    quickSelects,
    className,
    ...rest
  },
  ref,
) {
  return (
    <div ref={ref} className={classNames('med-filter-bar', className)} {...rest}>
      <div className="med-filter-bar__row">
        {showSearch ? (
          <SearchInput
            value={searchValue}
            onSearchChange={onSearchChange}
            placeholder={searchPlaceholder}
            className="med-filter-bar__search"
          />
        ) : null}
        {quickSelects ? <div className="med-filter-bar__quick">{quickSelects}</div> : null}
        {showFilterButton ? (
          <FilterButton active={activeFilterCount > 0} count={activeFilterCount} onClick={onFilterButtonClick}>
            Filters
          </FilterButton>
        ) : null}
      </div>
      {children ? <div className="med-filter-bar__chips">{children}</div> : null}
    </div>
  );
});

export { FilterBar };
export default FilterBar;