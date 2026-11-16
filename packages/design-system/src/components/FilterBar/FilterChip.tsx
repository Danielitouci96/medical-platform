import * as React from 'react';
import classNames from 'classnames';
import { Tag } from '../Tag/Tag';

export type FilterOperator = 'eq' | 'neq' | 'contains' | 'gt' | 'gte' | 'lt' | 'lte' | 'between';

export interface FilterChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Filter id. */
  id: string;
  /** Label shown for the active filter. */
  label: string;
  /** Displayed value. */
  value: React.ReactNode;
  /** Visual tone. `warning` uses the soft amber treatment for active filters. */
  tone?: 'info' | 'warning';
  onRemove: (id: string) => void;
}

const FilterChip = React.forwardRef<HTMLSpanElement, FilterChipProps>(function FilterChip(
  { id, label, value, tone = 'info', onRemove, className, ...rest },
  ref,
) {
  return (
    <Tag
      ref={ref}
      removable
      size="md"
      tone={tone}
      onRemove={() => onRemove(id)}
      removeLabel={`Remove filter ${label}`}
      className={classNames('med-filter-chip', `med-filter-chip--tone-${tone}`, className)}
      {...rest}
    >
      {label}: <strong className="med-filter-chip__value">{value}</strong>
    </Tag>
  );
});

export { FilterChip };
export default FilterChip;